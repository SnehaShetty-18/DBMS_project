const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Student = require('./StudentModel');
const Internship = require('./InternshipModel');

const Application = sequelize.define('Application', {
  application_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  student_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Student,
      key: 'student_id'
    }
  },
  internship_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Internship,
      key: 'internship_id'
    }
  },
  cover_letter: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  resume: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  status: {
    type: DataTypes.ENUM('pending', 'reviewed', 'accepted', 'rejected'),
    defaultValue: 'pending'
  },
  applied_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'applications',
  timestamps: false
});

// Define associations
Application.belongsTo(Student, { foreignKey: 'student_id' });
Application.belongsTo(Internship, { foreignKey: 'internship_id' });
Student.hasMany(Application, { foreignKey: 'student_id' });
Internship.hasMany(Application, { foreignKey: 'internship_id' });

module.exports = Application;