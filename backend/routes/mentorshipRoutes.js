const express = require('express');
const { 
  getAllMentorshipRequests, 
  getMentorshipRequestById, 
  updateMentorshipRequestStatus, 
  getMentorshipMessages, 
  sendMentorshipMessage,
  getMyMentorshipRequests
} = require('../controllers/mentorshipController');
const { authMiddleware } = require('../utils/authMiddleware');

const router = express.Router();

// Protected routes
router.get('/', authMiddleware, getAllMentorshipRequests);
router.get('/my', authMiddleware, getMyMentorshipRequests);
router.get('/:id', authMiddleware, getMentorshipRequestById);
router.put('/:id/status', authMiddleware, updateMentorshipRequestStatus);
router.get('/:requestId/messages', authMiddleware, getMentorshipMessages);
router.post('/:requestId/messages', authMiddleware, sendMentorshipMessage);

module.exports = router;