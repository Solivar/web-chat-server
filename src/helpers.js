const {
  CONSECUTIVE_MESSAGES_TIMEOUT_MS,
  MAX_CONSECUTIVE_MESSAGES,
  MAX_MESSAGES,
  MAX_NAME_LENGTH,
  MIN_NAME_LENGTH,
} = require('./constants');

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

exports.isUserSpamming = (users, userId) => {
  const currentTime = +new Date();
  const user = users.find(user => user.id === userId);

  if (!user.timeoutStart) {
    user.timeoutStart = currentTime;
    user.consecutiveMessages = 0;

    return false;
  }

  const hasTimedOut = user.timeoutStart + CONSECUTIVE_MESSAGES_TIMEOUT_MS <= currentTime;

  if (hasTimedOut) {
    user.timeoutStart = currentTime;
    user.consecutiveMessages = 0;

    return false;
  }

  if (user.consecutiveMessages > MAX_CONSECUTIVE_MESSAGES) {
    user.timeoutStart = currentTime;

    return true;
  }

  user.consecutiveMessages++;

  return false;
};
