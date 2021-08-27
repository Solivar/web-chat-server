const { MIN_NAME_LENGTH, MAX_NAME_LENGTH, MAX_MESSAGES } = require('./constants');

exports.isInvalidName = name => {
  if (name.length < MIN_NAME_LENGTH || name.length > MAX_NAME_LENGTH) {
    return true;
  }

  return false;
};

exports.isNameTaken = (users, name) => {
  const nameExists = users.find(user => user.name === name);

  if (nameExists) {
    return true;
  }

  return false;
};

exports.addMessage = (messages, message) => {
  if (messages.length === MAX_MESSAGES) {
    messages.shift();
  }

  messages.push(message);
};

exports.compareUserNames = (userOne, userTwo) => {
  if (userOne.name < userTwo.name) {
    return -1;
  }

  if (userOne.name > userTwo.name) {
    return 1;
  }

  return 0;
};

exports.isUserSpamming = userId => {};
