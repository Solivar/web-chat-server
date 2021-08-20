const crypto = require('crypto');

const isInvalidName = name => {
  if (name.length < 1 || name.length > 25) {
    return true;
  }

  return false;
};

const isNameTaken = (users, name) => {
  const nameExists = users.find(user => user.name === name);

  if (nameExists) {
    return true;
  }

  return false;
};

module.exports = (io, socket, users) => {
  const addUser = name => {
    if (socket.user) {
      socket.emit('join:exception', 'Already joined.');

      return;
    }

    if (isInvalidName(name)) {
      socket.emit('join:exception', 'Name must be 1 - 25 characters long.');

      return;
    }

    if (isNameTaken(users, name)) {
      socket.emit('join:exception', 'Name is already taken.');

      return;
    }

    socket.user = {
      name,
    };

    users.push({ id: socket.id, name });

    socket.emit('join:response', name);
    io.emit('chat:user_join', name);
  };

  const sendUsers = () => {
    const names = users.map(user => user.name);
    socket.emit('chat:user_list', names);
  };

  const sendMessage = messageContent => {
    const id = crypto.randomBytes(16).toString('hex');
    const date = new Date();
    const message = {
      id,
      name: socket.user.name,
      content: messageContent,
      createdAt: date,
    };

    io.emit('chat:message', message);
  };

  socket.on('join:set_name', addUser);
  socket.on('chat:get_user_list', sendUsers);
  socket.on('chat:send_message', sendMessage);
};
