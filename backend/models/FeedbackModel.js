const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./UserModel');
const MentorshipRequest = require('./MentorshipModel');

const Feedback = sequelize.define('Feedback', {
  feedback_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  from_user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'user_id'
    }
  },
  to_user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'user_id'
    }
  },
  mentorship_request_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: MentorshipRequest,
      key: 'request_id'
    }
  },
  rating: {
    type: DataTypes.INTEGER,
    allowNull: true,
    validate: {
      min: 1,
      max: 5
    }
  },
  comment: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'feedback',
  timestamps: false
});

// Define associations
Feedback.belongsTo(User, { foreignKey: 'from_user_id', as: 'fromUser' });
Feedback.belongsTo(User, { foreignKey: 'to_user_id', as: 'toUser' });
Feedback.belongsTo(MentorshipRequest, { foreignKey: 'mentorship_request_id' });
User.hasMany(Feedback, { foreignKey: 'from_user_id', as: 'givenFeedback' });
User.hasMany(Feedback, { foreignKey: 'to_user_id', as: 'receivedFeedback' });
MentorshipRequest.hasOne(Feedback, { foreignKey: 'mentorship_request_id' });

module.exports = Feedback;