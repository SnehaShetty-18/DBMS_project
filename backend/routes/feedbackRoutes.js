const express = require('express');
const { 
  submitFeedback, 
  getUserFeedback, 
  getGivenFeedback, 
  getUserAverageRating 
} = require('../controllers/feedbackController');
const { authMiddleware } = require('../utils/authMiddleware');

const router = express.Router();

// Protected routes
router.post('/', authMiddleware, submitFeedback);
router.get('/user/:userId', getUserFeedback);
router.get('/given', authMiddleware, getGivenFeedback);
router.get('/user/:userId/average', getUserAverageRating);

module.exports = router;