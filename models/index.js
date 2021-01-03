const logger = require('../common/logger');
const User = require('./user');
const Topic = require('./topic');
const Reply = require('./reply');
const Message = require('./message');
const sequelize = require('../common/database');

Topic.belongsTo(User);
Message.belongsTo(User);
Reply.belongsTo(Topic);
Reply.belongsTo(User);

(async () => {
  await sequelize.sync({ alter: true });
  logger.info('Database configured.');
  const isNoAdminExisted =
    (await User.findOne({ where: { isAdmin: true } })) === null;
  if (isNoAdminExisted) {
    logger.info('No admin user existed! Creating one for you.');
    await User.create({
      username: 'admin',
      password: '123456',
      isAdmin: true,
      isModerator: true,
    });
  }
})();

exports.User = User;
exports.Topic = Topic;
exports.Reply = Reply;
exports.Message = Message;
