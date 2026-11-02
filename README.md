# 🎓 Student Management Backend System

A clean, beginner-friendly RESTful Backend API built with **Node.js**, **Express.js**, and **MongoDB Atlas** using **Mongoose**.

Designed specifically for academic evaluation and college lab submissions, featuring clear folder architecture (MVC pattern), line-by-line comments, environment variable protection, and ready-to-test Postman configuration.

---

## 📋 Table of Contents
- [Tech Stack](#-tech-stack)
- [Project Architecture](#-project-architecture)
- [Getting Started & Installation](#-getting-started--installation)
- [MongoDB Atlas Setup Guide](#-mongodb-atlas-setup-guide)
- [Environment Variables (.env)](#-environment-variables-env)
- [Running the Project](#-running-the-project)
- [API Endpoints Reference](#-api-endpoints-reference)
- [Testing APIs with Postman](#-testing-apis-with-postman)
- [College Evaluation & Viva Guide (Explain Every File & Line)](#-college-evaluation--viva-guide)
- [Frequently Asked Viva Questions & Answers](#-frequently-asked-viva-questions--answers)
- [Pushing to Public GitHub Repository](#-pushing-to-public-github-repository)

---

## 🛠 Tech Stack

| Technology | Purpose |
| :--- | :--- |
| **Node.js** | JavaScript runtime environment executing backend code |
| **Express.js** | Fast, lightweight web framework for building RESTful APIs |
| **MongoDB Atlas**| Cloud-hosted NoSQL document database |
| **Mongoose** | Object Data Modeling (ODM) library for MongoDB |
| **dotenv** | Loads environment variables securely from `.env` |
| **cors** | Enables Cross-Origin Resource Sharing |
| **nodemon** | Development tool that auto-restarts the server upon file changes |

---

## 📂 Project Architecture

This project follows the **MVC (Model - View - Controller)** architectural pattern (Backend API variant: Model - Route - Controller):

```text
student-management-system/
│
├── config/
│   └── db.js                 # Database connection logic using Mongoose
│
├── models/
│   └── Student.js            # Student Schema & Model (Name, Email, Course)
│
├── controllers/
│   └── studentController.js  # CRUD business logic (Create, Read, Update, Delete)
│
├── routes/
│   └── studentRoutes.js      # Maps URL endpoints to controller functions
│
├── .env                      # Secret variables (MongoDB URI & PORT) - IGNORED BY GIT
├── .env.example              # Template showing required environment variables
├── .gitignore                # Protects sensitive files from being pushed to GitHub
├── package.json              # Project dependencies and npm scripts
├── postman_collection.json   # 1-Click importable Postman testing collection
├── README.md                 # Complete documentation & evaluation guide
└── server.js                 # Main entry point: initializes Express app & listens
```

---

## 🚀 Getting Started & Installation

### 1. Prerequisites
Ensure you have **Node.js** (v18+) and **npm** installed on your machine.
Verify with:
```bash
node -v
npm -v
```

### 2. Clone or Navigate to the Project Folder
```bash
cd "web dev backend"
```

### 3. Install Required Dependencies
Run the following command to download all necessary npm packages:
```bash
npm install
```

---

## ☁️ MongoDB Atlas Setup Guide

To connect the application to your free cloud database:

1. **Sign in to MongoDB Atlas**: Go to [mongodb.com/atlas](https://www.mongodb.com/cloud/atlas) and log in or create a free account.
2. **Create a Free Cluster**: Choose **M0 Free Shared Tier** and select your closest AWS region.
3. **Create Database User**:
   - Go to **Database Access** in the left sidebar.
   - Click **Add New Database User**.
   - Choose **Password** authentication.
   - Enter a username (e.g., `admin`) and a secure password (e.g., `student123`).
   - Assign user role: **Read and write to any database**.
   - Click **Add User**.
4. **Configure Network Access (IP Whitelist)**:
   - Go to **Network Access** in the left sidebar.
   - Click **Add IP Address**.
   - Select **Allow Access From Anywhere (`0.0.0.0/0`)** (recommended for evaluation/development).
   - Click **Confirm**.
5. **Copy Connection String**:
   - Go to **Database** (Clusters) in the left sidebar.
   - Click **Connect** on your cluster.
   - Select **Drivers** (Node.js).
   - Copy the connection string format:
     ```text
     mongodb+srv://<username>:<password>@cluster0.abcde.mongodb.net/studentDB?retryWrites=true&w=majority
     ```

---

## 🔐 Environment Variables (.env)

Private credentials like database passwords must never be hardcoded into source code.

1. Create a `.env` file in the project root directory (or edit the existing one):
```env
PORT=5001
MONGO_URI=mongodb+srv://<your_username>:<your_password>@cluster0.abcde.mongodb.net/studentDB?retryWrites=true&w=majority
```
> [!NOTE]
> We use `PORT=5001` to prevent conflicts with Apple's AirPlay Receiver which uses port 5000 by default on macOS.

2. `.gitignore` ensures your `.env` file and `node_modules/` folder will **never** be committed to GitHub.

---

## ⚡ Running the Project

### Development Mode (with automatic reload via nodemon):
```bash
npm run dev
```

### Production Mode:
```bash
npm start
```

When started, your terminal will display:
```text
 Server is running on port 5001
 Test the API in your browser or Postman at: http://localhost:5001
 MongoDB Atlas Connected: cluster0-shard-00-00.abcde.mongodb.net
```

---

## 📡 API Endpoints Reference

Base URL: `http://localhost:5001`

| Method | Endpoint | Description | Status Code |
| :--- | :--- | :--- | :--- |
| **GET** | `/` | Health check & welcome route | `200 OK` |
| **POST** | `/api/students` | Register a new student | `201 Created` |
| **GET** | `/api/students` | Fetch list of all students | `200 OK` |
| **GET** | `/api/students/:id` | Fetch single student by MongoDB ID | `200 OK` |
| **PUT** | `/api/students/:id` | Update student details by ID | `200 OK` |
| **DELETE** | `/api/students/:id` | Delete student record by ID | `200 OK` |

---

### Request & Response Examples

#### 1. Create Student
- **Method**: `POST`
- **URL**: `http://localhost:5001/api/students`
- **Headers**: `Content-Type: application/json`
- **Body (raw JSON)**:
```json
{
  "name": "Aarav Sharma",
  "email": "aarav.sharma@example.com",
  "course": "Computer Science"
}
```
- **Response (`201 Created`)**:
```json
{
  "success": true,
  "message": "Student registered successfully",
  "data": {
    "_id": "6726219b12a4f00123456789",
    "name": "Aarav Sharma",
    "email": "aarav.sharma@example.com",
    "course": "Computer Science",
    "createdAt": "2026-11-02T13:40:00.000Z",
    "updatedAt": "2026-11-02T13:40:00.000Z"
  }
}
```

#### 2. Get All Students
- **Method**: `GET`
- **URL**: `http://localhost:5001/api/students`
- **Response (`200 OK`)**:
```json
{
  "success": true,
  "count": 1,
  "data": [
    {
      "_id": "6726219b12a4f00123456789",
      "name": "Aarav Sharma",
      "email": "aarav.sharma@example.com",
      "course": "Computer Science",
      "createdAt": "2026-11-02T13:40:00.000Z",
      "updatedAt": "2026-11-02T13:40:00.000Z"
    }
  ]
}
```

#### 3. Get Student by ID
- **Method**: `GET`
- **URL**: `http://localhost:5001/api/students/6726219b12a4f00123456789`
- **Response (`200 OK`)**:
```json
{
  "success": true,
  "data": {
    "_id": "6726219b12a4f00123456789",
    "name": "Aarav Sharma",
    "email": "aarav.sharma@example.com",
    "course": "Computer Science"
  }
}
```

#### 4. Update Student
- **Method**: `PUT`
- **URL**: `http://localhost:5001/api/students/6726219b12a4f00123456789`
- **Headers**: `Content-Type: application/json`
- **Body (raw JSON)**:
```json
{
  "name": "Aarav Sharma",
  "email": "aarav.sharma@example.com",
  "course": "Artificial Intelligence & Data Science"
}
```
- **Response (`200 OK`)**:
```json
{
  "success": true,
  "message": "Student updated successfully",
  "data": {
    "_id": "6726219b12a4f00123456789",
    "name": "Aarav Sharma",
    "email": "aarav.sharma@example.com",
    "course": "Artificial Intelligence & Data Science"
  }
}
```

#### 5. Delete Student
- **Method**: `DELETE`
- **URL**: `http://localhost:5001/api/students/6726219b12a4f00123456789`
- **Response (`200 OK`)**:
```json
{
  "success": true,
  "message": "Student deleted successfully",
  "deletedStudentId": "6726219b12a4f00123456789"
}
```

---

## 🧪 Testing APIs with Postman

You can test all endpoints in Postman in two easy ways:

### Option A: Import the Included Postman Collection (Recommended)
1. Open **Postman**.
2. Click the **Import** button in the top-left corner.
3. Select the file named `postman_collection.json` located in the root of this project.
4. Postman will automatically create a folder named **Student Management Backend API** containing all 6 pre-configured requests.
5. In Postman, set the collection variable `baseUrl` to `http://localhost:5001`.
6. Run the requests in sequence:
   - First call `POST /api/students` to insert a student.
   - Copy the returned `_id`.
   - Use that ID in `GET /:id`, `PUT /:id`, and `DELETE /:id`.

### Option B: Manual Testing in Postman
- Select the HTTP method (**GET**, **POST**, **PUT**, **DELETE**).
- Enter the URL (e.g., `http://localhost:5001/api/students`).
- For `POST` and `PUT`:
  - Click on the **Body** tab.
  - Select **raw** and choose **JSON** from the dropdown menu.
  - Enter your JSON object.
  - Click **Send**.

---

## 🧑‍🏫 College Evaluation & Viva Guide

Use this section to confidently explain your project to your professor!

### 1. `server.js` (The Application Heart)
- **`require('dotenv').config()`**: Loads key-value pairs from `.env` into Node's global `process.env` before anything else runs.
- **`const express = require('express')`**: Imports Express to handle HTTP routing, middleware, and request/response lifecycles.
- **`const app = express()`**: Initializes the application instance.
- **`app.use(cors())`**: Middleware enabling Cross-Origin requests so frontend clients (React/Angular or browser apps) on other ports can communicate with this API.
- **`app.use(express.json())`**: Built-in middleware that parses incoming request bodies with JSON payloads and makes them accessible as `req.body`.
- **`app.use('/api/students', studentRoutes)`**: Mounts the student router under the `/api/students` base path (Route separation).
- **`app.listen(PORT, ...)`**: Starts the HTTP server listening on the specified port.

### 2. `config/db.js` (Database Connection)
- **`mongoose.connect(process.env.MONGO_URI)`**: Asynchronously connects to MongoDB Atlas using the URI string.
- **`async/await` and `try/catch`**: Ensures clean, readable asynchronous error handling. If the cluster credentials or network access fail, the error is caught and printed without crashing abruptly.

### 3. `models/Student.js` (Schema & Model)
- **`mongoose.Schema`**: Defines the structural blueprint and rules for documents stored in MongoDB.
  - `name`: Must be a non-empty string.
  - `email`: Must be unique, trimmed, lowercased, and match an email regex.
  - `course`: Must be a non-empty string.
- **`timestamps: true`**: Automatically tells MongoDB to generate and update `createdAt` and `updatedAt` timestamps.
- **`mongoose.model('Student', studentSchema)`**: Compiles the schema into a reusable model class. MongoDB pluralizes this to the `students` collection.

### 4. `controllers/studentController.js` (Business Logic)
- **`createStudent`**: Validates required fields, checks for duplicate email using `Student.findOne({ email })`, and persists the new document using `Student.create()`.
- **`getAllStudents`**: Calls `Student.find().sort({ createdAt: -1 })` to fetch all documents in reverse chronological order.
- **`getStudentById`**: Queries MongoDB using `Student.findById(req.params.id)` and returns a 404 if not found.
- **`updateStudent`**: Uses `Student.findByIdAndUpdate(id, data, { new: true, runValidators: true })`.
  - `{ new: true }`: Returns the newly updated document instead of the old one.
  - `{ runValidators: true }`: Re-validates the incoming updates against schema rules.
- **`deleteStudent`**: Uses `Student.findByIdAndDelete(req.params.id)` to remove the document from the database.

### 5. `routes/studentRoutes.js` (URL Routing)
- **`express.Router()`**: Creates an isolated mini-application for routing.
- Keeps route definitions clean and decouples URL paths from business logic implementation.

---

## ❓ Frequently Asked Viva Questions & Answers

#### Q1: What is Express.js and why do we use it over vanilla Node.js `http` module?
> **Answer**: Express.js is a minimal and flexible web application framework that provides robust routing, middleware support, error handling, and request/response helpers, saving developers from writing repetitive boilerplate code required by Node's built-in `http` module.

#### Q2: What is Middleware in Express?
> **Answer**: Middleware functions are functions that have access to the request object (`req`), response object (`res`), and the `next` middleware function in the application's request-response cycle. They can execute code, modify `req` and `res`, end the request-response cycle, or call the next middleware. Example: `express.json()`.

#### Q3: What is the difference between SQL and NoSQL (MongoDB)?
> **Answer**: SQL databases (e.g., MySQL, PostgreSQL) are relational, table-based, and have rigid predefined schemas. MongoDB is a NoSQL, document-oriented database that stores data in flexible, JSON-like BSON documents without rigid table relationships, allowing for easy horizontal scalability.

#### Q4: What is Mongoose and what is the difference between Schema and Model?
> **Answer**: Mongoose is an ODM (Object Data Modeling) library for MongoDB and Node.js.
> - A **Schema** is the blueprint defining the document structure, field types, validations, and default values.
> - A **Model** is a compiled wrapper built from the Schema that provides programming interfaces to query, insert, update, and delete documents in the collection.

#### Q5: Why do we use `.env` and `.gitignore`?
> **Answer**: `.env` keeps private sensitive configuration (like database passwords, secret keys, and port numbers) out of source code. `.gitignore` ensures that `.env` and bulky folders like `node_modules/` are never pushed to public repositories, preventing credential leaks and repository bloat.

#### Q6: What is the difference between PUT and PATCH?
> **Answer**: `PUT` is used to completely replace or update an entire existing resource, whereas `PATCH` is intended for partial updates of specific fields. In this project, `PUT` updates the student record.

#### Q7: What is the significance of HTTP Status Codes?
> - `200 OK`: Request succeeded.
> - `201 Created`: New resource successfully created.
> - `400 Bad Request`: Client sent invalid data or missing required fields.
> - `404 Not Found`: Requested resource or endpoint does not exist.
> - `500 Internal Server Error`: Server encountered an unhandled exception.

---

## 📤 Pushing to Public GitHub Repository

Follow these commands to push your project to your GitHub profile:

1. **Verify your `.gitignore` is working**:
   ```bash
   git status
   ```
   Ensure `.env` and `node_modules` do **NOT** appear in the untracked files list.

2. **Stage and Commit all project files**:
   ```bash
   git add .
   git commit -m "feat: complete student management backend system with Express and MongoDB Atlas"
   ```

3. **Create a new public repository on GitHub**:
   - Go to [github.com/new](https://github.com/new).
   - Enter repository name: `student-management-backend`.
   - Select **Public**.
   - Do **NOT** initialize with README or .gitignore (we already created them).
   - Click **Create repository**.

4. **Link local repository and push**:
   ```bash
   git remote add origin https://github.com/<your-username>/student-management-backend.git
   git branch -M main
   git push -u origin main
   ```

---

## 👨‍🎓 Submission Checklist for 3rd Evaluation
- [x] Node.js project initialized with `package.json`
- [x] Express.js server running and handling routes
- [x] MongoDB Atlas cloud cluster configured and connected via Mongoose
- [x] Student Schema created with `name`, `email`, and `course`
- [x] CRUD controller with all operations (Create, Read, Update, Delete)
- [x] Clean route separation using `express.Router`
- [x] `.env` protecting MongoDB Atlas credentials
- [x] `.gitignore` guarding secrets and `node_modules`
- [x] Tested with Postman (`postman_collection.json` included)
- [x] Code thoroughly commented for viva explanation
