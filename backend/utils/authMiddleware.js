const jwt = require('jsonwebtoken');
const User = require('../models/UserModel');
const Student = require('../models/StudentModel');
const Alumni = require('../models/AlumniModel');
require('dotenv').config();

const authMiddleware = async (req, res, next) => {
  try {
    // Get token from header
    const authHeader = req.header('Authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'No token, authorization denied' });
    }
    
    // Extract token
    const token = authHeader.split(' ')[1];
    
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Add user to request object with role information
    const user = await User.findByPk(decoded.user_id, {
      attributes: { exclude: ['password_hash'] }
    });
    
    if (!user) {
      return res.status(401).json({ message: 'Token is not valid' });
    }
    
    // Get role-specific data
    const student = await Student.findOne({ where: { user_id: user.user_id } });
    const alumni = await Alumni.findOne({ where: { user_id: user.user_id } });
    
    req.user = {
      ...user.toJSON(),
      Student: student,
      Alumni: alumni,
      role: student ? 'student' : alumni ? 'alumni' : 'user'
    };
    
    next();
  } catch (err) {
    console.error('Authentication error:', err);
    res.status(401).json({ message: 'Token is not valid' });
  }
};

// Role-based authorization middleware
const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: 'Authentication required' });
    }
    
    const userRole = req.user.role || 'user';
    
    if (!roles.includes(userRole)) {
      return res.status(403).json({ message: 'Access denied' });
    }
    
    next();
  };
};

module.exports = { authMiddleware, authorizeRoles };