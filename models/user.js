const { DataTypes, Model } = require('sequelize');
const sequelize = require('../common/database');

class User extends Model {}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    accessToken: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
    },
    url: DataTypes.STRING,
    avatarUrl: DataTypes.STRING,
    location: DataTypes.STRING,
    signature: DataTypes.TEXT,
    githubId: DataTypes.STRING,
    githubUsername: DataTypes.STRING,
    githubAccessToken: DataTypes.STRING,
    isAdmin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    isModerator: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    isBlocked: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    isActive: {
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

module.exports = User;
