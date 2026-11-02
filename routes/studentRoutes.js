// ==========================================
// File: routes/studentRoutes.js
// Purpose: API Route Definitions for Student Endpoints
// ==========================================

// Import Express framework to use its Router module
const express = require('express');

// Initialize Express Router
const router = express.Router();

// Import controller functions that contain the CRUD logic
const {
  createStudent,
  getAllStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
} = require('../controllers/studentController');

// ---------------------------------------------------------------------------
// Route Mapping
// All routes here are prefixed with '/api/students' in server.js
// ---------------------------------------------------------------------------

// 1. Create a Student: POST /api/students
router.post('/', createStudent);

// 2. Get All Students: GET /api/students
router.get('/', getAllStudents);

// 3. Get Single Student by ID: GET /api/students/:id
router.get('/:id', getStudentById);

// 4. Update Student by ID: PUT /api/students/:id
router.put('/:id', updateStudent);

// 5. Delete Student by ID: DELETE /api/students/:id
router.delete('/:id', deleteStudent);

// Export router instance to mount it in server.js
module.exports = router;
