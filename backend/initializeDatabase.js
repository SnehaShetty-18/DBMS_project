// initializeDatabase.js
// Script to initialize the database with tables

const sequelize = require('./config/db');
const User = require('./models/UserModel');
const Student = require('./models/StudentModel');
const Alumni = require('./models/AlumniModel');
const MentorshipRequest = require('./models/MentorshipModel');
const Message = require('./models/MessageModel');
const Internship = require('./models/InternshipModel');
const Application = require('./models/ApplicationModel');
const Feedback = require('./models/FeedbackModel');

const initializeDatabase = async () => {
  try {
    // Authenticate database connection
    await sequelize.authenticate();
    console.log('Database connection established successfully.');

    // Sync all models with the database
    await sequelize.sync({ alter: true });
    console.log('All models were synchronized successfully.');

    console.log('Database initialization completed!');
  } catch (error) {
    console.error('Error initializing database:', error);
  } finally {
    // Close database connection
    await sequelize.close();
  }
};

// Run the initialization
initializeDatabase();