const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./UserModel');

const Alumni = sequelize.define('Alumni', {
  alumni_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
    references: {
      model: User,
      key: 'user_id'
    }
  },
  company: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  position: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  industry: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  graduation_year: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  university: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  linkedin_profile: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  is_available_for_mentorship: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  years_of_experience: {
    type: DataTypes.INTEGER,
    allowNull: true
  }
}, {
  tableName: 'alumni',
  timestamps: false
});

// Define association
Alumni.belongsTo(User, { foreignKey: 'user_id' });
User.hasOne(Alumni, { foreignKey: 'user_id' });

module.exports = Alumni;