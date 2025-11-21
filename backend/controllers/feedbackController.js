const Feedback = require('../models/FeedbackModel');
const User = require('../models/UserModel');
const MentorshipRequest = require('../models/MentorshipModel');

// Submit feedback
const submitFeedback = async (req, res) => {
  try {
    const { to_user_id, mentorship_request_id, rating, comment } = req.body;

    // Check if recipient exists
    const recipient = await User.findByPk(to_user_id);
    if (!recipient) {
      return res.status(404).json({ message: 'Recipient user not found' });
    }

    // Check if mentorship request exists (if provided)
    if (mentorship_request_id) {
      const request = await MentorshipRequest.findByPk(mentorship_request_id);
      if (!request) {
        return res.status(404).json({ message: 'Mentorship request not found' });
      }
    }

    // Check if feedback already exists
    const existingFeedback = await Feedback.findOne({
      where: {
        from_user_id: req.user.user_id,
        to_user_id: to_user_id,
        mentorship_request_id: mentorship_request_id || null
      }
    });

    if (existingFeedback) {
      return res.status(400).json({ message: 'Feedback already submitted' });
    }

    // Create feedback
    const feedback = await Feedback.create({
      from_user_id: req.user.user_id,
      to_user_id: to_user_id,
      mentorship_request_id: mentorship_request_id || null,
      rating,
      comment
    });

    res.status(201).json({
      message: 'Feedback submitted successfully',
      feedback
    });
  } catch (error) {
    console.error('Submit feedback error:', error);
    res.status(500).json({ message: 'Server error while submitting feedback' });
  }
};

// Get feedback for a user
const getUserFeedback = async (req, res) => {
  try {
    const { userId } = req.params;
    
    // Check if user exists
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const feedback = await Feedback.findAll({
      where: { to_user_id: userId },
      include: [{
        model: User,
        as: 'fromUser',
        attributes: ['first_name', 'last_name']
      }]
    });

    res.json(feedback);
  } catch (error) {
    console.error('Get user feedback error:', error);
    res.status(500).json({ message: 'Server error while fetching feedback' });
  }
};

// Get feedback given by a user
const getGivenFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.findAll({
      where: { from_user_id: req.user.user_id },
      include: [{
        model: User,
        as: 'toUser',
        attributes: ['first_name', 'last_name']
      }]
    });

    res.json(feedback);
  } catch (error) {
    console.error('Get given feedback error:', error);
    res.status(500).json({ message: 'Server error while fetching feedback' });
  }
};

// Get average rating for a user
const getUserAverageRating = async (req, res) => {
  try {
    const { userId } = req.params;
    
    // Check if user exists
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const result = await Feedback.findOne({
      where: { to_user_id: userId },
      attributes: [
        [Feedback.sequelize.fn('AVG', Feedback.sequelize.col('rating')), 'averageRating'],
        [Feedback.sequelize.fn('COUNT', Feedback.sequelize.col('rating')), 'totalReviews']
      ]
    });

    res.json({
      userId,
      averageRating: result.dataValues.averageRating ? parseFloat(result.dataValues.averageRating).toFixed(1) : 0,
      totalReviews: parseInt(result.dataValues.totalReviews)
    });
  } catch (error) {
    console.error('Get user average rating error:', error);
    res.status(500).json({ message: 'Server error while calculating average rating' });
  }
};

module.exports = {
  submitFeedback,
  getUserFeedback,
  getGivenFeedback,
  getUserAverageRating
};