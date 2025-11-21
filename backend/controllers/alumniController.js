const Alumni = require('../models/AlumniModel');
const User = require('../models/UserModel');
const MentorshipRequest = require('../models/MentorshipModel');

// Get all alumni
const getAllAlumni = async (req, res) => {
  try {
    const alumni = await Alumni.findAll({
      include: [{
        model: User,
        attributes: ['first_name', 'last_name', 'email', 'profile_picture']
      }]
    });

    res.json(alumni);
  } catch (error) {
    console.error('Get alumni error:', error);
    res.status(500).json({ message: 'Server error while fetching alumni' });
  }
};

// Get alumni by ID
const getAlumniById = async (req, res) => {
  try {
    const { id } = req.params;
    const alumni = await Alumni.findByPk(id, {
      include: [{
        model: User,
        attributes: ['first_name', 'last_name', 'email', 'profile_picture', 'phone']
      }]
    });

    if (!alumni) {
      return res.status(404).json({ message: 'Alumni not found' });
    }

    res.json(alumni);
  } catch (error) {
    console.error('Get alumni by ID error:', error);
    res.status(500).json({ message: 'Server error while fetching alumni' });
  }
};

// Update alumni profile
const updateAlumniProfile = async (req, res) => {
  try {
    // First check if user is actually an alumni
    const alumni = await Alumni.findOne({ 
      where: { user_id: req.user.user_id },
      include: [{
        model: User,
        attributes: ['first_name', 'last_name', 'email']
      }]
    });
    
    if (!alumni) {
      return res.status(404).json({ message: 'Alumni profile not found' });
    }

    // Fields that can be updated
    const updatableFields = [
      'company',
      'position',
      'industry',
      'graduation_year',
      'university',
      'linkedin_profile',
      'is_available_for_mentorship',
      'years_of_experience'
    ];

    // Filter request body to only include updatable fields
    const updateData = {};
    updatableFields.forEach(field => {
      if (req.body[field] !== undefined) {
        updateData[field] = req.body[field];
      }
    });

    await alumni.update(updateData);

    // Return updated alumni with user data
    res.json({
      message: 'Alumni profile updated successfully',
      alumni: {
        ...alumni.toJSON(),
        User: alumni.User
      }
    });
  } catch (error) {
    console.error('Update alumni profile error:', error);
    res.status(500).json({ message: 'Server error while updating alumni profile' });
  }
};

// Get mentorship requests for alumni
const getMentorshipRequests = async (req, res) => {
  try {
    // Get the alumni record for the current user
    const alumni = await Alumni.findOne({ 
      where: { user_id: req.user.user_id },
      include: [{
        model: User,
        attributes: ['first_name', 'last_name', 'email']
      }]
    });
    
    if (!alumni) {
      return res.status(404).json({ message: 'Alumni profile not found' });
    }

    const requests = await MentorshipRequest.findAll({
      where: { alumni_id: alumni.alumni_id },
      include: [{
        model: User,
        as: 'Student.User',
        attributes: ['first_name', 'last_name', 'email']
      }]
    });

    res.json({
      requests,
      alumni: {
        ...alumni.toJSON(),
        User: alumni.User
      }
    });
  } catch (error) {
    console.error('Get mentorship requests error:', error);
    res.status(500).json({ message: 'Server error while fetching mentorship requests' });
  }
};

// Update mentorship request status
const updateMentorshipRequestStatus = async (req, res) => {
  try {
    const { requestId } = req.params;
    const { status } = req.body;

    // Get the alumni record for the current user with user data
    const alumni = await Alumni.findOne({ 
      where: { user_id: req.user.user_id },
      include: [{
        model: User,
        attributes: ['first_name', 'last_name', 'email']
      }]
    });
    
    if (!alumni) {
      return res.status(404).json({ message: 'Alumni profile not found' });
    }

    const request = await MentorshipRequest.findByPk(requestId);
    if (!request) {
      return res.status(404).json({ message: 'Mentorship request not found' });
    }

    // Check if the alumni owns this request
    if (request.alumni_id !== alumni.alumni_id) {
      return res.status(403).json({ message: 'Not authorized to update this request' });
    }

    request.status = status;
    request.responded_at = new Date();
    await request.save();

    res.json({
      message: 'Mentorship request updated successfully',
      request,
      alumni: {
        ...alumni.toJSON(),
        User: alumni.User
      }
    });
  } catch (error) {
    console.error('Update mentorship request error:', error);
    res.status(500).json({ message: 'Server error while updating mentorship request' });
  }
};

module.exports = {
  getAllAlumni,
  getAlumniById,
  updateAlumniProfile,
  getMentorshipRequests,
  updateMentorshipRequestStatus
};