const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const db = require('./config/db');

// Load environment variables
dotenv.config();

// Create Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(helmet());
app.use(morgan('combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Test database connection with better error handling
db.authenticate()
  .then(() => console.log('Database connected successfully.'))
  .catch(err => {
    console.error('Unable to connect to the database:', err.message);
    console.log('Please ensure MySQL is installed and running, and the database credentials are correct.');
  });

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Alumni Networking & Mentorship API' });
});

// User routes
const userRoutes = require('./routes/userRoutes');
app.use('/api/users', userRoutes);

// Alumni routes
const alumniRoutes = require('./routes/alumniRoutes');
app.use('/api/alumni', alumniRoutes);

// Student routes
const studentRoutes = require('./routes/studentRoutes');
app.use('/api/students', studentRoutes);

// Mentorship routes
const mentorshipRoutes = require('./routes/mentorshipRoutes');
app.use('/api/mentorship', mentorshipRoutes);

// Internship routes
const internshipRoutes = require('./routes/internshipRoutes');
app.use('/api/internships', internshipRoutes);

// Feedback routes
const feedbackRoutes = require('./routes/feedbackRoutes');
app.use('/api/feedback', feedbackRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!', error: err.message });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Start server with better error handling
const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}).on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.log(`Port ${PORT} is already in use. Please close the application using this port or change the PORT in .env file.`);
  } else {
    console.error('Server failed to start:', err.message);
  }
});

module.exports = app;