const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./UserModel');

const Student = sequelize.define('Student', {
  student_id: {
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
  student_number: {
    type: DataTypes.STRING(20),
    allowNull: false,
    unique: true
  },
  major: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  year_of_study: {
    type: DataTypes.INTEGER,
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
  resume: {
    type: DataTypes.STRING(255),
    allowNull: true
  }
}, {
  tableName: 'students',
  timestamps: false
});

// Define association
Student.belongsTo(User, { foreignKey: 'user_id' });
User.hasOne(Student, { foreignKey: 'user_id' });

module.exports = Student;