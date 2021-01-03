const { DataTypes, Model } = require('sequelize');
const sequelize = require('../common/database');

class Reply extends Model {}

Reply.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    content: DataTypes.TEXT,
    convertedContent: DataTypes.TEXT,
    isHidden: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    score: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  { sequelize }
);

module.exports = Reply;
