const MentorshipRequest = require('../models/MentorshipModel');
const Student = require('../models/StudentModel');
const Alumni = require('../models/AlumniModel');
const User = require('../models/UserModel');
const Message = require('../models/MessageModel');

// Get all mentorship requests
const getAllMentorshipRequests = async (req, res) => {
  try {
    const requests = await MentorshipRequest.findAll({
      include: [
        {
          model: Student,
          include: [{
            model: User,
            attributes: ['first_name', 'last_name', 'email']
          }]
        },
        {
          model: Alumni,
          include: [{
            model: User,
            attributes: ['first_name', 'last_name', 'email']
          }]
        }
      ]
    });

    res.json(requests);
  } catch (error) {
    console.error('Get mentorship requests error:', error);
    res.status(500).json({ message: 'Server error while fetching mentorship requests' });
  }
};

// Get mentorship requests for the current user
const getMyMentorshipRequests = async (req, res) => {
  try {
    // Check if user is a student or alumni
    const student = await Student.findOne({ where: { user_id: req.user.user_id } });
    const alumni = await Alumni.findOne({ where: { user_id: req.user.user_id } });

    let requests;
    if (student) {
      // Get requests where this student is the requester
      requests = await MentorshipRequest.findAll({
        where: { student_id: student.student_id },
        include: [
          {
            model: Alumni,
            include: [{
              model: User,
              attributes: ['first_name', 'last_name', 'email']
            }]
          }
        ]
      });
    } else if (alumni) {
      // Get requests where this alumni is the mentor
      requests = await MentorshipRequest.findAll({
        where: { alumni_id: alumni.alumni_id },
        include: [
          {
            model: Student,
            include: [{
              model: User,
              attributes: ['first_name', 'last_name', 'email']
            }]
          }
        ]
      });
    } else {
      return res.status(403).json({ message: 'Only students and alumni can view mentorship requests' });
    }

    res.json(requests);
  } catch (error) {
    console.error('Get my mentorship requests error:', error);
    res.status(500).json({ message: 'Server error while fetching your mentorship requests' });
  }
};

// Get mentorship request by ID
const getMentorshipRequestById = async (req, res) => {
  try {
    const { id } = req.params;
    const request = await MentorshipRequest.findByPk(id, {
      include: [
        {
          model: Student,
          include: [{
            model: User,
            attributes: ['first_name', 'last_name', 'email']
          }]
        },
        {
          model: Alumni,
          include: [{
            model: User,
            attributes: ['first_name', 'last_name', 'email']
          }]
        }
      ]
    });

    if (!request) {
      return res.status(404).json({ message: 'Mentorship request not found' });
    }

    res.json(request);
  } catch (error) {
    console.error('Get mentorship request by ID error:', error);
    res.status(500).json({ message: 'Server error while fetching mentorship request' });
  }
};

// Update mentorship request status
const updateMentorshipRequestStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const request = await MentorshipRequest.findByPk(id);
    if (!request) {
      return res.status(404).json({ message: 'Mentorship request not found' });
    }

    request.status = status;
    request.responded_at = new Date();
    await request.save();

    res.json({
      message: 'Mentorship request updated successfully',
      request
    });
  } catch (error) {
    console.error('Update mentorship request error:', error);
    res.status(500).json({ message: 'Server error while updating mentorship request' });
  }
};

// Get messages for a mentorship request
const getMentorshipMessages = async (req, res) => {
  try {
    const { requestId } = req.params;
    
    // Verify the request exists and user has access
    const request = await MentorshipRequest.findByPk(requestId);
    if (!request) {
      return res.status(404).json({ message: 'Mentorship request not found' });
    }
    
    // Check if user is part of this mentorship
    const student = await Student.findOne({ where: { user_id: req.user.user_id } });
    const alumni = await Alumni.findOne({ where: { user_id: req.user.user_id } });
    
    const isParticipant = 
      (student && request.student_id === student.student_id) || 
      (alumni && request.alumni_id === alumni.alumni_id);
      
    if (!isParticipant) {
      return res.status(403).json({ message: 'Not authorized to view these messages' });
    }

    const messages = await Message.findAll({
      where: { mentorship_request_id: requestId },
      include: [
        { model: User, as: 'sender', attributes: ['first_name', 'last_name'] },
        { model: User, as: 'receiver', attributes: ['first_name', 'last_name'] }
      ],
      order: [['sent_at', 'ASC']]
    });

    res.json(messages);
  } catch (error) {
    console.error('Get mentorship messages error:', error);
    res.status(500).json({ message: 'Server error while fetching messages' });
  }
};

// Send message in mentorship request
const sendMentorshipMessage = async (req, res) => {
  try {
    const { requestId } = req.params;
    const { content, receiver_id } = req.body;
    
    // Verify the request exists and user has access
    const request = await MentorshipRequest.findByPk(requestId);
    if (!request) {
      return res.status(404).json({ message: 'Mentorship request not found' });
    }
    
    // Check if user is part of this mentorship
    const student = await Student.findOne({ where: { user_id: req.user.user_id } });
    const alumni = await Alumni.findOne({ where: { user_id: req.user.user_id } });
    
    const isParticipant = 
      (student && request.student_id === student.student_id) || 
      (alumni && request.alumni_id === alumni.alumni_id);
      
    if (!isParticipant) {
      return res.status(403).json({ message: 'Not authorized to send messages in this mentorship' });
    }

    // Create message
    const message = await Message.create({
      sender_id: req.user.user_id,
      receiver_id: receiver_id,
      mentorship_request_id: requestId,
      content: content
    });

    res.status(201).json({
      message: 'Message sent successfully',
      message
    });
  } catch (error) {
    console.error('Send mentorship message error:', error);
    res.status(500).json({ message: 'Server error while sending message' });
  }
};

module.exports = {
  getAllMentorshipRequests,
  getMyMentorshipRequests,
  getMentorshipRequestById,
  updateMentorshipRequestStatus,
  getMentorshipMessages,
  sendMentorshipMessage
};