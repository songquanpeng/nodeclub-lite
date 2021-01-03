const { DataTypes, Model } = require('sequelize');
const sequelize = require('../common/database');

class Message extends Model {}

Message.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    content: DataTypes.TEXT,
    link: DataTypes.TEXT,
    isRead: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  { sequelize }
);

module.exports = Message;
