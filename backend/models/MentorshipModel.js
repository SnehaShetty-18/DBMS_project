const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Student = require('./StudentModel');
const Alumni = require('./AlumniModel');

const MentorshipRequest = sequelize.define('MentorshipRequest', {
  request_id: {
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
  alumni_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Alumni,
      key: 'alumni_id'
    }
  },
  subject: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  message: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  status: {
    type: DataTypes.ENUM('pending', 'accepted', 'rejected', 'completed'),
    defaultValue: 'pending'
  },
  requested_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  responded_at: {
    type: DataTypes.DATE,
    allowNull: true
  }
}, {
  tableName: 'mentorship_requests',
  timestamps: false
});

// Define associations
MentorshipRequest.belongsTo(Student, { foreignKey: 'student_id' });
MentorshipRequest.belongsTo(Alumni, { foreignKey: 'alumni_id' });
Student.hasMany(MentorshipRequest, { foreignKey: 'student_id' });
Alumni.hasMany(MentorshipRequest, { foreignKey: 'alumni_id' });

module.exports = MentorshipRequest;