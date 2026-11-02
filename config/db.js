// ==========================================
// File: config/db.js
// Purpose: MongoDB Atlas Database Connection
// ==========================================

// Import mongoose to interact with MongoDB
const mongoose = require('mongoose');

// Asynchronous function to establish database connection
const connectDB = async () => {
  try {
    // Check if MONGO_URI is set or still has default placeholder text
    if (!process.env.MONGO_URI || process.env.MONGO_URI.includes('<password>')) {
      console.log('\n⚠️  MongoDB Atlas URI is not configured yet in .env');
      console.log('👉 Please add your actual MongoDB Atlas connection string to .env to enable database operations.\n');
      return;
    }

    // Connect to MongoDB using the URI from environment variables
    const conn = await mongoose.connect(process.env.MONGO_URI);

    // If connection succeeds, print host name
    console.log(` MongoDB Atlas Connected: ${conn.connection.host}`);
  } catch (error) {
    // If connection fails, print clear error message
    console.error(` Database Connection Error: ${error.message}`);
    console.error('👉 Tip: Check your database username, password, and Atlas IP Whitelist (0.0.0.0/0).\n');
  }
};

// Export the function so it can be called inside server.js
module.exports = connectDB;
