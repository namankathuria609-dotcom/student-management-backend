// ==========================================
// File: server.js
// Purpose: Main Server Entry Point
// ==========================================

// 1. Load environment variables from .env file into process.env
require('dotenv').config();

// 2. Import core dependencies
const express = require('express');
const cors = require('cors');

// 3. Import custom database connection module
const connectDB = require('./config/db');

// 4. Import student API route handlers
const studentRoutes = require('./routes/studentRoutes');

// 5. Initialize the Express application
const app = express();

// 6. Connect to MongoDB Atlas
connectDB();

// 7. Built-in and Third-Party Middlewares
// Enables Cross-Origin Resource Sharing (allows frontend apps to access API)
app.use(cors());

// Parses incoming requests with JSON payloads (e.g., from Postman)
app.use(express.json());

// Parses URL-encoded data from HTML forms
app.use(express.urlencoded({ extended: true }));

// 8. Root Route - Health check and welcome message
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Welcome to the Student Management Backend API!',
    status: 'Server is healthy and running',
    endpoints: {
      getAllStudents: 'GET /api/students',
      getStudentById: 'GET /api/students/:id',
      createStudent: 'POST /api/students',
      updateStudent: 'PUT /api/students/:id',
      deleteStudent: 'DELETE /api/students/:id',
    },
  });
});

// 9. Mount Student Routes
// Any request starting with '/api/students' will be forwarded to studentRoutes
app.use('/api/students', studentRoutes);

// 10. Handle 404 - Not Found for undefined routes
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.method} ${req.originalUrl}`,
  });
});

// 11. Define Port number (from .env file or default to 5000)
const PORT = process.env.PORT || 5000;

// 12. Start the Express server and listen on the specified port
app.listen(PORT, () => {
  console.log(` Server is running on port ${PORT}`);
  console.log(` Test the API in your browser or Postman at: http://localhost:${PORT}`);
});
