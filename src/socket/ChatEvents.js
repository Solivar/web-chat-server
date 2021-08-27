const crypto = require('crypto');
const {
  MIN_NAME_LENGTH,
  MAX_NAME_LENGTH,
  MIN_MESSAGE_LENGTH,
  MAX_MESSAGE_LENGTH,
} = require('../constants');

const {
  addMessage,
  compareUserNames,
  isInvalidName,
  isNameTaken,
  isUserSpamming,
} = require('../helpers');

module.exports = (io, socket, { messages, users }) => {
  const addUser = name => {
    if (socket.user) {
      socket.emit('join:exception', 'Already joined.');

      return;
    }

    if (isInvalidName(name)) {
      socket.emit(
        'join:exception',
        `Name must be ${MIN_NAME_LENGTH} - ${MAX_NAME_LENGTH} characters long.`,
      );

      return;
    }

    if (isNameTaken(users, name)) {
      socket.emit('join:exception', 'Name is already taken.');

      return;
    }

    socket.user = {
      name,
    };

    users.push({ id: socket.id, name, recentMessageTimes: [] });
    users.sort(compareUserNames);

    socket.emit('join:response', name);
    io.emit('chat:user_join', name);
  };

  const sendUsers = () => {
    const names = users.map(user => user.name);
    socket.emit('chat:user_list', names);
  };

  const sendMessage = messageContent => {
    if (
      !messageContent ||
      messageContent.length < MIN_MESSAGE_LENGTH ||
      messageContent.length > MAX_MESSAGE_LENGTH
    ) {
      socket.emit(
        'chat:error',
        `Message must be ${MIN_MESSAGE_LENGTH} - ${MAX_MESSAGE_LENGTH} characters long.`,
      );

      return;
    }

    if (isUserSpamming(socket.id)) {
      socket.emit('chat:error', `Slow down! You are sending messages too fast.`);
    }

    const id = crypto.randomBytes(16).toString('hex');
    const date = new Date();
    const message = {
      id,
      name: socket.user.name,
      content: messageContent,
      createdAt: date,
    };

    addMessage(messages, message);
    io.emit('chat:message', message);
  };

  const sendMessages = () => {
    socket.emit('chat:message_list', messages);
  };

  const sendUserTyping = () => {
    io.emit('chat:user_typing', socket.user.name);
  };

  socket.on('join:set_name', addUser);
  socket.on('chat:get_user_list', sendUsers);
  socket.on('chat:send_message', sendMessage);
  socket.on('chat:get_message_list', sendMessages);
  socket.on('chat:user_typing', sendUserTyping);
};
