require('dotenv').config();

const port = 8000;
const httpServer = require('http').createServer();
require('./src/socket')(httpServer);

httpServer.listen(port, () => {
  console.log(`App running on http://localhost:${port}`);
});
