const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const sequelize = require('../config/db');
const User = require('../models/UserModel');
const Student = require('../models/StudentModel');
const Alumni = require('../models/AlumniModel');
require('dotenv').config();

// Debugging: Log sequelize object
console.log('Sequelize object in userController:', sequelize);

// Register a new user
const registerUser = async (req, res) => {
  console.log('Register user called with body:', req.body);
  let transaction;
  try {
    const { first_name, last_name, email, password, role, ...roleSpecificData } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Debugging: Check sequelize object before transaction
    console.log('Sequelize object before transaction:', sequelize);
    if (!sequelize) {
      throw new Error('Sequelize instance is undefined');
    }

    // Start transaction
    transaction = await sequelize.transaction();
    console.log('Transaction created:', transaction);

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const user = await User.create({
      first_name,
      last_name,
      email,
      password_hash: hashedPassword
    }, { transaction });
    console.log('User created:', user.toJSON());

    // Create role-specific profile
    if (role === 'student') {
      const studentData = {
        user_id: user.user_id,
        student_number: roleSpecificData.student_number,
        major: roleSpecificData.major,
        year_of_study: roleSpecificData.year_of_study,
        graduation_year: roleSpecificData.graduation_year,
        university: roleSpecificData.university
      };
      console.log('Creating student with data:', studentData);
      await Student.create(studentData, { transaction });
    } else if (role === 'alumni') {
      const alumniData = {
        user_id: user.user_id,
        company: roleSpecificData.company,
        position: roleSpecificData.position,
        industry: roleSpecificData.industry,
        graduation_year: roleSpecificData.graduation_year,
        university: roleSpecificData.university,
        is_available_for_mentorship: roleSpecificData.is_available_for_mentorship || false,
        years_of_experience: roleSpecificData.years_of_experience
      };
      console.log('Creating alumni with data:', alumniData);
      await Alumni.create(alumniData, { transaction });
    }

    // Commit transaction
    await transaction.commit();
    console.log('Transaction committed');

    // Generate JWT token
    const token = jwt.sign(
      { user_id: user.user_id },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: {
        user_id: user.user_id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        role
      }
    });
  } catch (error) {
    // Rollback transaction on error if it was started
    if (transaction) {
      console.log('Rolling back transaction');
      await transaction.rollback();
    }
    
    // Handle specific database errors
    if (error.name === 'SequelizeConnectionRefusedError') {
      console.error('Database connection error:', error.message);
      return res.status(500).json({ 
        message: 'Database connection failed. Please ensure MySQL is installed and running.', 
        error: 'DATABASE_CONNECTION_ERROR' 
      });
    } else if (error.name === 'SequelizeValidationError') {
      console.error('Validation error:', error.message);
      return res.status(400).json({ 
        message: 'Validation error in request data', 
        error: error.message 
      });
    } else {
      console.error('Registration error:', error);
      return res.status(500).json({ 
        message: 'Server error during registration', 
        error: error.message 
      });
    }
  }
};

// Login user
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check if user is active
    if (!user.is_active) {
      return res.status(400).json({ message: 'Account is deactivated' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { user_id: user.user_id },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    // Determine user role with better error handling
    let role = 'user';
    let profile = null;
    
    const student = await Student.findOne({ where: { user_id: user.user_id } });
    const alumni = await Alumni.findOne({ where: { user_id: user.user_id } });
    
    if (student) {
      role = 'student';
      profile = student;
    } else if (alumni) {
      role = 'alumni';
      profile = alumni;
    }

    res.json({
      message: 'Login successful',
      token,
      user: {
        user_id: user.user_id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        role
      },
      profile
    });
  } catch (error) {
    // Handle specific database errors
    if (error.name === 'SequelizeConnectionRefusedError') {
      console.error('Database connection error:', error.message);
      return res.status(500).json({ 
        message: 'Database connection failed. Please ensure MySQL is installed and running.', 
        error: 'DATABASE_CONNECTION_ERROR' 
      });
    } else {
      console.error('Login error:', error);
      return res.status(500).json({ 
        message: 'Server error during login', 
        error: error.message 
      });
    }
  }
};

// Get user profile
const getUserProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.user_id, {
      attributes: { exclude: ['password_hash'] }
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Get role-specific data with better error handling
    let profile = null;
    let role = 'user';
    
    const student = await Student.findOne({ where: { user_id: user.user_id } });
    const alumni = await Alumni.findOne({ where: { user_id: user.user_id } });
    
    if (student) {
      profile = student;
      role = 'student';
    } else if (alumni) {
      profile = alumni;
      role = 'alumni';
    }

    res.json({
      user,
      profile,
      role
    });
  } catch (error) {
    // Handle specific database errors
    if (error.name === 'SequelizeConnectionRefusedError') {
      console.error('Database connection error:', error.message);
      return res.status(500).json({ 
        message: 'Database connection failed. Please ensure MySQL is installed and running.', 
        error: 'DATABASE_CONNECTION_ERROR' 
      });
    } else {
      console.error('Get profile error:', error);
      return res.status(500).json({ 
        message: 'Server error while fetching profile', 
        error: error.message 
      });
    }
  }
};

// Update user profile
const updateUserProfile = async (req, res) => {
  try {
    const { first_name, last_name, phone, date_of_birth, ...profileData } = req.body;
    
    // Update user data
    const user = await User.findByPk(req.user.user_id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    await user.update({
      first_name,
      last_name,
      phone,
      date_of_birth
    });

    // Update role-specific data
    const student = await Student.findOne({ where: { user_id: user.user_id } });
    const alumni = await Alumni.findOne({ where: { user_id: user.user_id } });
    let transaction;
    
    try {
      transaction = await sequelize.transaction();
      
      if (student) {
        await student.update(profileData, { transaction });
      } else if (alumni) {
        await alumni.update(profileData, { transaction });
      }
      
      await transaction.commit();
    } catch (err) {
      if (transaction) {
        await transaction.rollback();
      }
      throw err;
    }

    res.json({
      message: 'Profile updated successfully',
      user,
      profile: student || alumni || null
    });
  } catch (error) {
    // Handle specific database errors
    if (error.name === 'SequelizeConnectionRefusedError') {
      console.error('Database connection error:', error.message);
      return res.status(500).json({ 
        message: 'Database connection failed. Please ensure MySQL is installed and running.', 
        error: 'DATABASE_CONNECTION_ERROR' 
      });
    } else {
      console.error('Update profile error:', error);
      return res.status(500).json({ 
        message: 'Server error while updating profile', 
        error: error.message 
      });
    }
  }
};

module.exports = {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile
};