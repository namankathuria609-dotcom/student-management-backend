// ==========================================
// File: controllers/studentController.js
// Purpose: Business Logic for Student CRUD Operations
// ==========================================

// Import Student model to perform database operations
const Student = require('../models/Student');

// @desc    Create a new student record
// @route   POST /api/students
// @access  Public
const createStudent = async (req, res) => {
  try {
    // 1. Extract student details from request body (sent by client/Postman)
    const { name, email, course } = req.body;

    // 2. Validate that all required fields are provided
    if (!name || !email || !course) {
      return res.status(400).json({
        success: false,
        message: 'Please provide name, email, and course',
      });
    }

    // 3. Check if a student with the same email already exists in the database
    const existingStudent = await Student.findOne({ email });
    if (existingStudent) {
      return res.status(400).json({
        success: false,
        message: 'A student with this email already exists',
      });
    }

    // 4. Create and save new student in MongoDB Atlas
    const newStudent = await Student.create({
      name,
      email,
      course,
    });

    // 5. Send HTTP 201 (Created) response with the saved student data
    res.status(201).json({
      success: true,
      message: 'Student registered successfully',
      data: newStudent,
    });
  } catch (error) {
    // Handle validation errors or server errors
    res.status(500).json({
      success: false,
      message: 'Server error while creating student',
      error: error.message,
    });
  }
};

// @desc    Get all students from database
// @route   GET /api/students
// @access  Public
const getAllStudents = async (req, res) => {
  try {
    // Fetch all student records from MongoDB, sorted by newest first
    const students = await Student.find().sort({ createdAt: -1 });

    // Send HTTP 200 (OK) response with total count and student list
    res.status(200).json({
      success: true,
      count: students.length,
      data: students,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error while fetching students',
      error: error.message,
    });
  }
};

// @desc    Get a single student by MongoDB ID
// @route   GET /api/students/:id
// @access  Public
const getStudentById = async (req, res) => {
  try {
    // Find student by ID passed in URL parameters (req.params.id)
    const student = await Student.findById(req.params.id);

    // If no student is found with that ID, return HTTP 404 (Not Found)
    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Student not found with the provided ID',
      });
    }

    // Send HTTP 200 (OK) response with the found student
    res.status(200).json({
      success: true,
      data: student,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error or invalid ID format',
      error: error.message,
    });
  }
};

// @desc    Update an existing student's details
// @route   PUT /api/students/:id
// @access  Public
const updateStudent = async (req, res) => {
  try {
    // Find student by ID and update with new data from request body
    // { new: true } returns the modified document rather than the original
    // { runValidators: true } ensures schema validation rules run on update
    const updatedStudent = await Student.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    // If student ID does not exist in database, return 404
    if (!updatedStudent) {
      return res.status(404).json({
        success: false,
        message: 'Student not found with the provided ID',
      });
    }

    // Send HTTP 200 (OK) response with the updated student
    res.status(200).json({
      success: true,
      message: 'Student updated successfully',
      data: updatedStudent,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error while updating student',
      error: error.message,
    });
  }
};

// @desc    Delete a student from database
// @route   DELETE /api/students/:id
// @access  Public
const deleteStudent = async (req, res) => {
  try {
    // Find student by ID and remove from MongoDB Atlas
    const deletedStudent = await Student.findByIdAndDelete(req.params.id);

    // If student ID is not found, return 404
    if (!deletedStudent) {
      return res.status(404).json({
        success: false,
        message: 'Student not found with the provided ID',
      });
    }

    // Send HTTP 200 (OK) response confirming deletion
    res.status(200).json({
      success: true,
      message: 'Student deleted successfully',
      deletedStudentId: req.params.id,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error while deleting student',
      error: error.message,
    });
  }
};

// Export all controller functions so routes can map HTTP requests to them
module.exports = {
  createStudent,
  getAllStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
};
