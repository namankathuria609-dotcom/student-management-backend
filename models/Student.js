// ==========================================
// File: models/Student.js
// Purpose: Student Data Model & Schema Definition
// ==========================================

// Import mongoose library
const mongoose = require('mongoose');

// Define the blueprint (Schema) for student documents
const studentSchema = new mongoose.Schema(
  {
    // Student Name: required text field
    name: {
      type: String,
      required: [true, 'Student name is required'],
      trim: true, // Removes extra spaces from both ends
    },

    // Student Email: required, unique text field
    email: {
      type: String,
      required: [true, 'Student email is required'],
      unique: true, // Prevents duplicate student emails
      trim: true,
      lowercase: true, // Converts email to lowercase before saving
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        'Please enter a valid email address',
      ],
    },

    // Course Name: required text field
    course: {
      type: String,
      required: [true, 'Course name is required'],
      trim: true,
    },
  },
  {
    // Automatically creates and manages 'createdAt' and 'updatedAt' fields
    timestamps: true,
  }
);

// Create the 'Student' model using the schema
// Mongoose will automatically map this to a collection named 'students' in MongoDB
const Student = mongoose.model('Student', studentSchema);

// Export the model so controllers can query and mutate student records
module.exports = Student;
