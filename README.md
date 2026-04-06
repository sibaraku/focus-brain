BrainFocus Web Application

BrainFocus is a web application that helps users track focus sessions, manage their productivity, and view statistics. The app includes user registration, login, session tracking, statistics, and history.

---

Features

User registration and login with JWT authentication.

Focus session management: start, complete, view statistics, and history.

Front-end dashboard with focus timer, total sessions, total time, best day, and history list.

Clear session history.

Secure password storage with bcrypt.


---

Tech Stack

Backend: Node.js, Express.js

Database: MySQL

Authentication: JWT (JSON Web Token)

Front-end: React, react-router-dom

Styling: CSS


---

Getting Started

Installation

1. Clone the repository:

git clone <repository_url>

cd focus-brain

2. Install dependencies for backend:

cd backend

npm install

3. Set up the MySQL database

4. Start the backend server:

node server.js

5. Install dependencies for frontend:

cd frontend

npm install

npm run dev

7. Open http://localhost:5173 in your browser

---

API Endpoints

Authentication

| Method | Endpoint         | Body                            | Description                          |
| ------ | ---------------- | ------------------------------- | ------------------------------------ |
| POST   | `/auth/register` | `{ email, password, nickname }` | Registers a new user                 |
| POST   | `/auth/login`    | `{ email, password }`           | Logs in a user and returns JWT token |

Focus Sessions (Protected routes, require Authorization header with Bearer token)

| Method | Endpoint              | Body | Description                           |
| ------ | --------------------- | ---- | ------------------------------------- |
| POST   | `/focus/start`        | -    | Starts a new focus session            |
| POST   | `/focus/:id/complete` | -    | Marks a focus session as completed    |
| GET    | `/focus/stats`        | -    | Returns total sessions and total time |
| GET    | `/focus/history`      | -    | Returns completed sessions            |
| DELETE | `/focus/history`      | -    | Deletes all sessions for the user     |

---

Front-end Components

App.jsx - Main component toggling Login/SignUp forms

Login.jsx / SignUp.jsx - Forms with client-side validation

Dashboard.jsx - Focus timer, statistics, best day, history, and clear history button

InputField.jsx - Reusable input component with password visibility toggle


---

Database Schema

Users Table

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  nickname VARCHAR(50) NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

Focus Sessions Table

CREATE TABLE focus_sessions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  start_time DATETIME NOT NULL,
  duration INT,
  completed BOOLEAN DEFAULT FALSE,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

---

Security

Passwords are hashed using bcrypt

All protected routes require JWT authentication

SQL queries use parameterized statements to prevent SQL injection

CORS enabled (should restrict to trusted domains in production)

