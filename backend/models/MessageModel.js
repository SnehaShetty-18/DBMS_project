const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./UserModel');
const MentorshipRequest = require('./MentorshipModel');

const Message = sequelize.define('Message', {
  message_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  sender_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'user_id'
    }
  },
  receiver_id: {
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
  content: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  sent_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  is_read: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
}, {
  tableName: 'messages',
  timestamps: false
});

// Define associations
Message.belongsTo(User, { foreignKey: 'sender_id', as: 'sender' });
Message.belongsTo(User, { foreignKey: 'receiver_id', as: 'receiver' });
Message.belongsTo(MentorshipRequest, { foreignKey: 'mentorship_request_id' });
User.hasMany(Message, { foreignKey: 'sender_id', as: 'sentMessages' });
User.hasMany(Message, { foreignKey: 'receiver_id', as: 'receivedMessages' });
MentorshipRequest.hasMany(Message, { foreignKey: 'mentorship_request_id' });

module.exports = Message;