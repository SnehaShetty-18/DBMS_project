const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Alumni = require('./AlumniModel');

const Internship = sequelize.define('Internship', {
  internship_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  alumni_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Alumni,
      key: 'alumni_id'
    }
  },
  title: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  company: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  location: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  start_date: {
    type: DataTypes.DATE,
    allowNull: true
  },
  end_date: {
    type: DataTypes.DATE,
    allowNull: true
  },
  application_deadline: {
    type: DataTypes.DATE,
    allowNull: true
  },
  is_active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'internships',
  timestamps: false
});

// Define associations
Internship.belongsTo(Alumni, { foreignKey: 'alumni_id' });
Alumni.hasMany(Internship, { foreignKey: 'alumni_id' });

module.exports = Internship;