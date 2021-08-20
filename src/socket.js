const chatEvents = require('./socket/ChatEvents');

const messages = [];
const users = [];

module.exports = httpServer => {
  const io = require('socket.io')(httpServer, {
    cors: {
      origin: process.env.CLIENT_ADDRESS,
      methods: ['GET', 'POST'],
    },
  });

  io.on('connection', socket => {
    socket.on('disconnect', () => {
      if (!socket.user) {
        return;
      }

      const userIndex = users.findIndex(user => user.id === socket.id);

      io.emit('chat:user_leave', users[userIndex].name);
      users.splice(userIndex, 1);
    });

    chatEvents(io, socket, { messages, users });
  });
};
