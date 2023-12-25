'use strict';
const express = require('express');
const app = express();
const port = 3000;
app.use(express.json());

const joi = require('joi');
const userSchema = joi.object({
  firstname: joi.string().min(1).required(),
  secondname: joi.string().min(1).required(),
  city: joi.string().min(1),
  age: joi.number().min(0).required(),
});

const db = require('./users_db.js');

app.get('/', (req, res) => {
  res.send(`<h1> Hello World! aka work with User Server</h1>
  <p>GET / - this page</p>
  <p>GET /users - get all users (json in console)</p>
  <p>GET /users/:id - get user by id (json in console)</p>
  <p>POST /users - create user</p>
  <p>PUT /users/:id - modify user</p>
  <p>DELETE /users/:id - modify user</p>
  `);
});

app.get('/users', (req, res) => {
  res.send({ users: db.usersRead() });
});

app.get('/users/:id', (req, res) => {
  const id = +req.params.id;
  const user = db.findUser(id);
  if (user) {
    res.send({ user });
  } else {
    res.status(404);
    res.send({ user: null });
  }
});

app.post('/users', (req, res) => {
  const valid = userSchema.validate(req.body);
  if (!valid.error) {
    const uid = db.addUser(req.body);
    res.send({ id: uid });
  } else {
    res.status(400).send({ error: valid.error });
  }
});

app.put('/users/:id', (req, res) => {
  const id = +req.params.id;
  let user = db.findUser(id);
  if (user) {
    const valid = userSchema.validate(req.body);
    if (!valid.error) {
      user = db.modifyUser(id, req.body);
      res.send({ user });
    } else {
      res.status(400).send({ error: valid.error });
    }
  } else {
    res.status(404);
    res.send({ user: null });
  }
});

app.delete('/users/:id', (req, res) => {
  const id = +req.params.id;
  let user = db.findUser(id);
  if (user) {
    user = db.deleteUser(id);
    res.send(user);
  } else {
    res.status(404);
    res.send({ user: null });
  }
});

app.use((req, res) => {
  res.send(`<h1>404 page was not found</h1> <a href="/">back to Home</a>`);
});

app.listen(port);
console.log(`server started at port: ${port}`);
