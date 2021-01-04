const { DataTypes, Model } = require('sequelize');
const sequelize = require('../common/database');

class Topic extends Model {}

Topic.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    title: DataTypes.STRING,
    content: DataTypes.TEXT,
    convertedContent: DataTypes.TEXT,
    tag: {
      type: DataTypes.STRING,
      defaultValue: 'others',
    },
    isPinned: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    isLocked: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    isHidden: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    isMarked: {
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

module.exports = Topic;
