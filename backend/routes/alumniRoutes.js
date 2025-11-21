const express = require('express');
const { 
  getAllAlumni, 
  getAlumniById, 
  updateAlumniProfile, 
  getMentorshipRequests, 
  updateMentorshipRequestStatus 
} = require('../controllers/alumniController');
const { authMiddleware } = require('../utils/authMiddleware');

const router = express.Router();

// Public routes
router.get('/', getAllAlumni);
router.get('/:id', getAlumniById);

// Protected routes
router.put('/profile', authMiddleware, updateAlumniProfile);
router.get('/mentorship/requests', authMiddleware, getMentorshipRequests);
router.put('/mentorship/requests/:requestId', authMiddleware, updateMentorshipRequestStatus);

module.exports = router;