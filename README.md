<div align="center">

# 🎓 Student Management System — REST API

A modern, lightweight, beginner-friendly RESTful backend API built with **Node.js**, **Express.js**, and **MongoDB Atlas** using **Mongoose**.

[![Node.js](https://img.shields.io/badge/Node.js-20.x-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-4.x-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB Atlas](https://img.shields.io/badge/MongoDB_Atlas-Cloud_DB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/atlas)
[![Mongoose](https://img.shields.io/badge/Mongoose-ODM-880000?style=for-the-badge&logo=mongoose&logoColor=white)](https://mongoosejs.com/)
[![Postman](https://img.shields.io/badge/Postman-Ready-FF6C37?style=for-the-badge&logo=postman&logoColor=white)](https://www.postman.com/)

---

[Features](#-key-features) • [Architecture](#-system-architecture) • [Quick Start](#-quick-start) • [API Reference](#-api-endpoints) • [Postman Guide](#-postman-testing) • [Viva Q&A](#-professor-evaluation--viva-guide)

</div>

---

## ✨ Key Features

- ⚡ **RESTful Architecture**: Clean CRUD endpoints for student record management.
- ☁️ **Cloud Database**: Fully integrated with MongoDB Atlas via Mongoose ODM.
- 🧩 **MVC Pattern**: Strict separation of concerns (Models, Routes, Controllers, Config).
- 🛡️ **Secure Configuration**: Environment variables isolated via `dotenv` and guarded by `.gitignore`.
- 🧪 **Pre-configured Postman Suite**: 1-click test collection included (`postman_collection.json`).
- 📝 **Evaluation-Ready Code**: Extensively commented for academic evaluation and line-by-line review.

---

## 🏛️ System Architecture

### Request Flow
```text
┌─────────────────┐       HTTP Requests        ┌───────────────────────┐
│ Postman/Client  │ ─────────────────────────> │   server.js           │
└─────────────────┘                            │ (Middleware & App)    │
                                               └──────────┬────────────┘
                                                          │
                                                          ▼
                                               ┌───────────────────────┐
                                               │ routes/               │
                                               │ studentRoutes.js      │
                                               └──────────┬────────────┘
                                                          │
                                                          ▼
                                               ┌───────────────────────┐
                                               │ controllers/          │
                                               │ studentController.js  │
                                               └──────────┬────────────┘
                                                          │
                                         ┌────────────────┴────────────────┐
                                         ▼                                 ▼
                              ┌──────────────────────┐          ┌──────────────────────┐
                              │ models/Student.js    │          │ config/db.js         │
                              │ (Schema Validation)  │          │ (Atlas Connection)   │
                              └──────────┬───────────┘          └──────────┬───────────┘
                                         │                                 │
                                         └────────────────┬────────────────┘
                                                          │
                                                          ▼
                                               ┌───────────────────────┐
                                               │   MongoDB Atlas       │
                                               │ (students collection) │
                                               └───────────────────────┘
```

### Clean Directory Structure
```text
├── 📁 config/
│   └── 📄 db.js                 # Database connection & error handling
├── 📁 controllers/
│   └── 📄 studentController.js  # CRUD controller logic
├── 📁 models/
│   └── 📄 Student.js            # Mongoose Schema (Name, Email, Course)
├── 📁 routes/
│   └── 📄 studentRoutes.js      # REST API route declarations
├── 📄 .env.example              # Public environment template
├── 📄 .gitignore                # Protects secrets (.env) & node_modules
├── 📄 package.json              # Dependencies & npm scripts
├── 📄 postman_collection.json   # 1-Click Postman test collection
├── 📄 README.md                 # Project documentation
└── 📄 server.js                 # Application entry point
```

---

## 🚀 Quick Start

### 1. Clone & Install
```bash
git clone https://github.com/namankathuria609-dotcom/student-management-backend.git
cd student-management-backend
npm install
```

### 2. Environment Setup
Create a `.env` file in the root directory:
```env
PORT=5001
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.abcde.mongodb.net/studentDB?retryWrites=true&w=majority
```
> **Note**: Port `5001` is used to prevent port conflicts with macOS ControlCenter / AirPlay Receiver on port `5000`.

### 3. Run the Server
```bash
# Development mode (auto-reload on save)
npm run dev

# Production mode
npm start
```
Server runs at: `http://localhost:5001`

---

## 📡 API Endpoints

**Base URL**: `http://localhost:5001`

| Method | Endpoint | Description | Status Code |
| :--- | :--- | :--- | :--- |
| `GET` | `/` | Health check & endpoint directory | `200 OK` |
| `POST` | `/api/students` | Create and register a new student | `201 Created` |
| `GET` | `/api/students` | Retrieve all students | `200 OK` |
| `GET` | `/api/students/:id` | Retrieve single student by MongoDB ID | `200 OK` |
| `PUT` | `/api/students/:id` | Update student details by ID | `200 OK` |
| `DELETE`| `/api/students/:id` | Remove a student from database | `200 OK` |

### Sample Payload (`POST /api/students` & `PUT /api/students/:id`)
```json
{
  "name": "Aarav Sharma",
  "email": "aarav.sharma@example.com",
  "course": "Computer Science"
}
```

---

## 🧪 Postman Testing

A complete Postman collection is included in this repository: [`postman_collection.json`](./postman_collection.json).

1. Open **Postman** and click **Import** (top left).
2. Choose [`postman_collection.json`](./postman_collection.json).
3. The collection provides all 6 pre-configured requests with variables:
   - `{{baseUrl}}` $\rightarrow$ `http://localhost:5001`
   - `{{studentId}}` $\rightarrow$ Target student's MongoDB ID.
4. Execute **Create Student**, copy the generated `_id`, and test the remaining endpoints in sequence.

---

## 🧑‍🏫 Professor Evaluation & Viva Guide

### Core Code Breakdown

- **`server.js`**: Initializes Express, configures middleware (`cors`, `express.json()`), mounts API routes under `/api/students`, and listens on `PORT`.
- **`config/db.js`**: Connects asynchronously to MongoDB Atlas using `mongoose.connect()`. Uses `try/catch` for clean error reporting without crashing the server.
- **`models/Student.js`**: Defines the data blueprint with validation:
  - `name`: String, required, trimmed.
  - `email`: String, required, unique index, lowercase format.
  - `course`: String, required, trimmed.
  - `timestamps: true`: Auto-creates `createdAt` and `updatedAt`.
- **`controllers/studentController.js`**: Contains business logic:
  - `Student.create()` $\rightarrow$ Creates new record.
  - `Student.find().sort()` $\rightarrow$ Reads all records.
  - `Student.findById()` $\rightarrow$ Reads single record.
  - `Student.findByIdAndUpdate()` $\rightarrow$ Updates with `{ new: true, runValidators: true }`.
  - `Student.findByIdAndDelete()` $\rightarrow$ Removes record.
- **`routes/studentRoutes.js`**: Maps clean HTTP verbs (`POST`, `GET`, `PUT`, `DELETE`) to corresponding controller functions using `express.Router()`.

---

### Top Viva Questions & Quick Answers

<details>
<summary><b>1. Why use Express.js instead of Node's built-in <code>http</code> module?</b></summary>
<br>
Express simplifies route handling, middleware integration, JSON body parsing, and response formatting. The raw <code>http</code> module requires manual URL parsing and manual request chunk assembly.
</details>

<details>
<summary><b>2. What is Middleware and why is <code>express.json()</code> essential?</b></summary>
<br>
Middleware functions intercept incoming HTTP requests before reaching route handlers. <code>express.json()</code> parses raw incoming JSON payloads into accessible JavaScript objects under <code>req.body</code>.
</details>

<details>
<summary><b>3. What is the difference between Schema and Model in Mongoose?</b></summary>
<br>
A <b>Schema</b> is the blueprint defining document structure, types, and validation rules. A <b>Model</b> is the compiled constructor that provides methods to query, create, update, and delete documents in the MongoDB collection.
</details>

<details>
<summary><b>4. Why are <code>.env</code> and <code>.gitignore</code> critical in production?</b></summary>
<br>
<code>.env</code> stores sensitive credentials (database connection strings, secret keys). <code>.gitignore</code> prevents these secrets and heavy dependencies (<code>node_modules/</code>) from leaking to public repositories.
</details>

<details>
<summary><b>5. What do status codes 200, 201, 400, and 404 represent?</b></summary>
<br>
<ul>
  <li><b>200 OK</b>: Request succeeded.</li>
  <li><b>201 Created</b>: New resource successfully created on server.</li>
  <li><b>400 Bad Request</b>: Missing or invalid request data.</li>
  <li><b>404 Not Found</b>: Requested route or resource does not exist.</li>
</ul>
</details>

---

<div align="center">
Built with ❤️ for College Academic Evaluation
</div>
