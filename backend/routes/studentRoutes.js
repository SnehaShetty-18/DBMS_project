const express = require('express');
const { 
  getAllStudents, 
  getStudentById, 
  updateStudentProfile, 
  createMentorshipRequest, 
  getMyMentorshipRequests 
} = require('../controllers/studentController');
const { authMiddleware } = require('../utils/authMiddleware');

const router = express.Router();

// Public routes
router.get('/', getAllStudents);
router.get('/:id', getStudentById);

// Protected routes
router.put('/profile', authMiddleware, updateStudentProfile);
router.post('/mentorship/request', authMiddleware, createMentorshipRequest);
router.get('/mentorship/requests', authMiddleware, getMyMentorshipRequests);

module.exports = router;