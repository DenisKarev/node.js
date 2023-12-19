'use strict';
const pc = require('./pagecounters.js');

const express = require('express');

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  
  res.send(`<h1> Hello World!</h1> <a href="/about">about</a> <p>${pc(req.url)}</p>`);
});

app.get('/about', (req, res) => {
  res.send(`<h1>About page!</h1> <a href="/">Home</a> <p>${pc(req.url)}</p>`);
});

app.use((req, res) => {
  res.send(`<h1>404 page was not found</h1> <a href="/">back to Home</a> <p>${pc('404')}</p>`);
});

app.listen(port);
console.log(`server started at port: ${port}`);