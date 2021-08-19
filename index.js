const express = require('express');
const morgan = require('morgan');

const port = 8000;
const app = express();

const httpServer = require('http').createServer();
require('./socket')(httpServer);

app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

httpServer.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
