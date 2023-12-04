'use strict';

const http = require('http');

let hcounter = 0;
let acounter = 0;
let nfcounter = 0;

const server = http.createServer((req, res) => {
  switch (req.url) {
    case '/':
      hcounter++;
      res.writeHead(200, { 'Content-Type': 'text/html; charset=UTF-8' });
      res.end(`<h2>Home page (main)</h2>
      <a href='/about'>about</a>
      <p> visits counter ${hcounter}</p>`);
      break;
    case '/about':
      acounter++;
      res.writeHead(200, { 'Content-Type': 'text/html; charset=UTF-8' });
      res.end(`<h2>About page</h2>
      <a href='/'>home</a>
      <p> visits counter ${acounter}</p>`);
      break;

    default:
      nfcounter++;
      res.writeHead(404, { 'Content-Type': 'text/html; charset=UTF-8' });
      res.end(`<h2>404</h2>
        <p>Not found anything</p>
        <a href='/'>home</a>
        <p> visits counter ${nfcounter}</p>`);
      break;
  }
});

const port = 3000;

server.listen(port);
