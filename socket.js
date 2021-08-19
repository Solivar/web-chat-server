const chatEvents = require('./src/socket/ChatEvents');

const users = [];

module.exports = httpServer => {
  const io = require('socket.io')(httpServer, {
    cors: {
      origin: 'http://localhost:4200',
      methods: ['GET', 'POST'],
    },
  });

  io.on('connection', socket => {
    console.log('connected');

    socket.on('disconnect', () => {
      console.log('user disconnected');
    });

    chatEvents(socket, users);
  });
};

// const test = require('./src/socket/ChatEvents');

// console.log('kek');
// console.log(test);

// const io = new Server(server, {
//   cors: {
//     origin: 'http://localhost:4200',
//     methods: ['GET', 'POST'],
//   },
// });

// const users = [];

// io.on('connection', socket => {
//   socket.on('disconnect', () => {
//     console.log('user disconnected');
//   });
// });

// const onConnection = socket => {
//   registerOrderHandlers(io, socket);
//   registerUserHandlers(io, socket);
// };

// io.on('connection', onConnection);
