const models = require('../models');
const User = models.User;

async function getUserByName(username) {
  return await User.findOne({ where: { username } });
}

async function createUser(username, password) {
  return await User.create({ username, password });
}

module.exports = {
  getUserByName,
  createUser,
};
