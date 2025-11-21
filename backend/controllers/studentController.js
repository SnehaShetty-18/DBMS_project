const Student = require('../models/StudentModel');
const User = require('../models/UserModel');
const MentorshipRequest = require('../models/MentorshipModel');
const Alumni = require('../models/AlumniModel');

// Get all students
const getAllStudents = async (req, res) => {
  try {
    const students = await Student.findAll({
      include: [{
        model: User,
        attributes: ['first_name', 'last_name', 'email', 'profile_picture']
      }]
    });

    res.json(students);
  } catch (error) {
    console.error('Get students error:', error);
    res.status(500).json({ message: 'Server error while fetching students' });
  }
};

// Get student by ID
const getStudentById = async (req, res) => {
  try {
    const { id } = req.params;
    const student = await Student.findByPk(id, {
      include: [{
        model: User,
        attributes: ['first_name', 'last_name', 'email', 'profile_picture', 'phone']
      }]
    });

    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    res.json(student);
  } catch (error) {
    console.error('Get student by ID error:', error);
    res.status(500).json({ message: 'Server error while fetching student' });
  }
};

// Update student profile
const updateStudentProfile = async (req, res) => {
  try {
    const student = await Student.findOne({ where: { user_id: req.user.user_id } });
    if (!student) {
      return res.status(404).json({ message: 'Student profile not found' });
    }

    // Fields that can be updated
    const updatableFields = [
      'student_number',
      'major',
      'year_of_study',
      'graduation_year',
      'university',
      'linkedin_profile'
    ];

    // Filter request body to only include updatable fields
    const updateData = {};
    updatableFields.forEach(field => {
      if (req.body[field] !== undefined) {
        updateData[field] = req.body[field];
      }
    });

    await student.update(updateData);

    res.json({
      message: 'Student profile updated successfully',
      student
    });
  } catch (error) {
    console.error('Update student profile error:', error);
    res.status(500).json({ message: 'Server error while updating student profile' });
  }
};

// Create mentorship request
const createMentorshipRequest = async (req, res) => {
  try {
    const { alumni_id, subject, message } = req.body;

    // Check if student exists
    const student = await Student.findOne({ where: { user_id: req.user.user_id } });
    if (!student) {
      return res.status(404).json({ message: 'Student profile not found' });
    }

    // Check if alumni exists
    const alumni = await Alumni.findByPk(alumni_id);
    if (!alumni) {
      return res.status(404).json({ message: 'Alumni not found' });
    }

    // Check if request already exists
    const existingRequest = await MentorshipRequest.findOne({
      where: {
        student_id: student.student_id,
        alumni_id: alumni_id
      }
    });

    if (existingRequest) {
      return res.status(400).json({ message: 'Mentorship request already exists' });
    }

    // Create mentorship request
    const request = await MentorshipRequest.create({
      student_id: student.student_id,
      alumni_id: alumni_id,
      subject,
      message
    });

    res.status(201).json({
      message: 'Mentorship request created successfully',
      request
    });
  } catch (error) {
    console.error('Create mentorship request error:', error);
    res.status(500).json({ message: 'Server error while creating mentorship request' });
  }
};

// Get student's mentorship requests
const getMyMentorshipRequests = async (req, res) => {
  try {
    const student = await Student.findOne({ where: { user_id: req.user.user_id } });
    if (!student) {
      return res.status(404).json({ message: 'Student profile not found' });
    }

    const requests = await MentorshipRequest.findAll({
      where: { student_id: student.student_id },
      include: [{
        model: Alumni,
        include: [{
          model: User,
          attributes: ['first_name', 'last_name', 'email']
        }]
      }]
    });

    res.json(requests);
  } catch (error) {
    console.error('Get mentorship requests error:', error);
    res.status(500).json({ message: 'Server error while fetching mentorship requests' });
  }
};

module.exports = {
  getAllStudents,
  getStudentById,
  updateStudentProfile,
  createMentorshipRequest,
  getMyMentorshipRequests
};