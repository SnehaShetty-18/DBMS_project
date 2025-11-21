const express = require('express');
const { 
  createInternship, 
  getAllInternships, 
  getInternshipById, 
  updateInternship, 
  deleteInternship, 
  applyForInternship, 
  getInternshipApplications,
  getMyInternships
} = require('../controllers/internshipController');
const { authMiddleware } = require('../utils/authMiddleware');

const router = express.Router();

// Public routes
router.get('/', getAllInternships);
router.get('/:id', getInternshipById);

// Protected routes
router.post('/', authMiddleware, createInternship);
router.put('/:id', authMiddleware, updateInternship);
router.delete('/:id', authMiddleware, deleteInternship);
router.post('/:id/apply', authMiddleware, applyForInternship);
router.get('/:id/applications', authMiddleware, getInternshipApplications);
router.get('/my', authMiddleware, getMyInternships);

module.exports = router;