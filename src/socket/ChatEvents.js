const isValidNameLength = name => {
  if (name.length < 1 || name.length > 25) {
    return false;
  }

  return true;
};

const isNameTaken = (users, name) => {
  const nameExists = users.find(userName => userName === name);

  if (nameExists) {
    return true;
  }

  return false;
};

module.exports = (socket, users) => {
  const addUser = name => {
    console.log('user joining', name);

    if (!isValidNameLength(users, name)) {
      // socket.emit('Name must be 1 - 25 characters long.');
      return;
    }

    if (!isNameTaken(users, name)) {
      return;
    }
  };

  socket.on('chat:join', addUser);
};
