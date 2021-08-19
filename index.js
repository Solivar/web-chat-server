const express = require('express');
const app = express();
const port = 5000;

const morgan = require('morgan');

app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.send('<h1>testaa</h1>!');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
