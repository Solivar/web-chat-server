const port = 8000;

const httpServer = require('http').createServer();
require('./socket')(httpServer);

httpServer.listen(port, () => {
  console.log(`App running on http://localhost:${port}`);
});
