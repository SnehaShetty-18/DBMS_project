const Internship = require('../models/InternshipModel');
const Alumni = require('../models/AlumniModel');
const User = require('../models/UserModel');
const Application = require('../models/ApplicationModel');
const Student = require('../models/StudentModel');

// Create a new internship
const createInternship = async (req, res) => {
  try {
    const alumni = await Alumni.findOne({ where: { user_id: req.user.user_id } });
    if (!alumni) {
      return res.status(403).json({ message: 'Only alumni can create internships' });
    }

    const internship = await Internship.create({
      ...req.body,
      alumni_id: alumni.alumni_id
    });

    res.status(201).json({
      message: 'Internship created successfully',
      internship
    });
  } catch (error) {
    console.error('Create internship error:', error);
    res.status(500).json({ message: 'Server error while creating internship' });
  }
};

// Get all internships
const getAllInternships = async (req, res) => {
  try {
    const internships = await Internship.findAll({
      where: { is_active: true },
      include: [{
        model: Alumni,
        include: [{
          model: User,
          attributes: ['first_name', 'last_name', 'email']
        }]
      }]
    });

    res.json(internships);
  } catch (error) {
    console.error('Get internships error:', error);
    res.status(500).json({ message: 'Server error while fetching internships' });
  }
};

// Get internship by ID
const getInternshipById = async (req, res) => {
  try {
    const { id } = req.params;
    const internship = await Internship.findByPk(id, {
      include: [{
        model: Alumni,
        include: [{
          model: User,
          attributes: ['first_name', 'last_name', 'email']
        }]
      }]
    });

    if (!internship) {
      return res.status(404).json({ message: 'Internship not found' });
    }

    res.json(internship);
  } catch (error) {
    console.error('Get internship by ID error:', error);
    res.status(500).json({ message: 'Server error while fetching internship' });
  }
};

// Update internship
const updateInternship = async (req, res) => {
  try {
    const { id } = req.params;
    
    const internship = await Internship.findByPk(id);
    if (!internship) {
      return res.status(404).json({ message: 'Internship not found' });
    }

    // Check if alumni owns this internship
    const alumni = await Alumni.findOne({ where: { user_id: req.user.user_id } });
    if (!alumni || internship.alumni_id !== alumni.alumni_id) {
      return res.status(403).json({ message: 'Not authorized to update this internship' });
    }

    await internship.update(req.body);

    res.json({
      message: 'Internship updated successfully',
      internship
    });
  } catch (error) {
    console.error('Update internship error:', error);
    res.status(500).json({ message: 'Server error while updating internship' });
  }
};

// Delete internship
const deleteInternship = async (req, res) => {
  try {
    const { id } = req.params;
    
    const internship = await Internship.findByPk(id);
    if (!internship) {
      return res.status(404).json({ message: 'Internship not found' });
    }

    // Check if alumni owns this internship
    const alumni = await Alumni.findOne({ where: { user_id: req.user.user_id } });
    if (!alumni || internship.alumni_id !== alumni.alumni_id) {
      return res.status(403).json({ message: 'Not authorized to delete this internship' });
    }

    await internship.destroy();

    res.json({ message: 'Internship deleted successfully' });
  } catch (error) {
    console.error('Delete internship error:', error);
    res.status(500).json({ message: 'Server error while deleting internship' });
  }
};

// Apply for internship
const applyForInternship = async (req, res) => {
  try {
    const { id } = req.params;
    const { cover_letter, resume } = req.body;
    
    // Check if student exists
    const student = await Student.findOne({ where: { user_id: req.user.user_id } });
    if (!student) {
      return res.status(403).json({ message: 'Only students can apply for internships' });
    }

    // Check if internship exists
    const internship = await Internship.findByPk(id);
    if (!internship) {
      return res.status(404).json({ message: 'Internship not found' });
    }

    // Check if already applied
    const existingApplication = await Application.findOne({
      where: {
        student_id: student.student_id,
        internship_id: id
      }
    });

    if (existingApplication) {
      return res.status(400).json({ message: 'Already applied for this internship' });
    }

    // Create application
    const application = await Application.create({
      student_id: student.student_id,
      internship_id: id,
      cover_letter,
      resume
    });

    res.status(201).json({
      message: 'Application submitted successfully',
      application
    });
  } catch (error) {
    console.error('Apply for internship error:', error);
    res.status(500).json({ message: 'Server error while applying for internship' });
  }
};

// Get applications for an internship (alumni only)
const getInternshipApplications = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Check if internship exists
    const internship = await Internship.findByPk(id);
    if (!internship) {
      return res.status(404).json({ message: 'Internship not found' });
    }

    // Check if alumni owns this internship
    const alumni = await Alumni.findOne({ where: { user_id: req.user.user_id } });
    if (!alumni || internship.alumni_id !== alumni.alumni_id) {
      return res.status(403).json({ message: 'Not authorized to view applications for this internship' });
    }

    const applications = await Application.findAll({
      where: { internship_id: id },
      include: [{
        model: Student,
        include: [{
          model: User,
          attributes: ['first_name', 'last_name', 'email']
        }]
      }]
    });

    res.json(applications);
  } catch (error) {
    console.error('Get internship applications error:', error);
    res.status(500).json({ message: 'Server error while fetching applications' });
  }
};

// Get internships posted by the current alumni
const getMyInternships = async (req, res) => {
  try {
    // Get the alumni record for the current user
    const alumni = await Alumni.findOne({ where: { user_id: req.user.user_id } });
    if (!alumni) {
      return res.status(404).json({ message: 'Alumni profile not found' });
    }

    const internships = await Internship.findAll({
      where: { alumni_id: alumni.alumni_id },
      include: [{
        model: Alumni,
        include: [{
          model: User,
          attributes: ['first_name', 'last_name', 'email']
        }]
      }]
    });

    res.json(internships);
  } catch (error) {
    console.error('Get my internships error:', error);
    res.status(500).json({ message: 'Server error while fetching your internships' });
  }
};

module.exports = {
  createInternship,
  getAllInternships,
  getInternshipById,
  updateInternship,
  deleteInternship,
  applyForInternship,
  getInternshipApplications,
  getMyInternships
};