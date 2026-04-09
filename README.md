🗳️ E-Voting Web App
Project Overview

This is a secure e-voting web application built using Node.js, Express, MongoDB, and JWT authentication. The system allows users to register, login, vote for candidates, and view voting results. Admins can manage candidates, and each voter can vote only once.

Key Features:

User registration & login with secure password hashing.
JWT-based authentication for secure access.
Admin role for managing candidates.
Voters can cast votes for candidates (only once).
Vote counts displayed in descending order.
Candidate list available for all users.
Middleware for validation and authorization.

🛠️ Technologies Used
Component	Technology
Backend	Node.js, Express
Database	MongoDB
Authentication	JWT (JSON Web Tokens)
Password Security	bcryptjs
Frontend	HTML, CSS, JavaScript

📂 Project Structure
Voting_App/
│
├── backend/
│ ├── models/
│ │ ├── user.js
│ │ └── candidate.js
│ │
│ ├── routes/
│ │ ├── userRoutes.js
│ │ └── candidateRoutes.js
│ │
│ ├── middlewares/
│ │ └── validateUser.js
│ │
│ ├── emailServices.js
│ ├── jwt.js
│ ├── db.js
│ └── server.js
│
├── frontend/
│ ├── index.html
│ ├── admin.html
│ ├── vote.html
│ ├── result.html
│ ├── signup.html
│ ├── login.html
│ │
│ ├── js/
│ │ ├── api.js
│ │ ├── auth.js
│ │ ├── vote.js
│ │ ├── admin.js
│ │ └── result.js
│ │
│ └── css/
│ └── style.css
│
├── package.json
└── README.md

🔑 Middleware & Routes
Middleware:
jwtAuthMiddleware: Protects routes by verifying JWT tokens.
validateUserSignup: Validates user registration data.
Routes:
User Routes (/user)
POST /signup → Register a user.
POST /login → Login and get JWT token.
GET /profile → Get user profile.
PUT /profile/password → Update password.
Candidate Routes (/candidate)
POST / → Add new candidate (admin only).
PUT /:candidateID → Update candidate info (admin only).
DELETE /:candidateID → Delete candidate (admin only).
GET /vote/:candidateID → Vote for a candidate.
GET /vote/count → Get vote counts.
GET / → Get list of candidates.

⚙️ Setup Instructions
Clone the repository:
git clone https://github.com/yourusername/voting-app.git
cd voting-app
Install dependencies:
npm install

Setup environment variables:
Create a .env file with:
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000
Run the backend:
node backend/server.js

Open frontend:
Open frontend/index.html in your browser.

🧪 Testing the Application
Register Admin account
Login as Admin
Add candidates
Register Voter account
Login as Voter
Cast vote
View real-time vote updates
Check email confirmation

📡 Real-Time Features

This application uses Socket.IO to provide:

Instant vote count updates
Live synchronization across devices
Real-time candidate vote refresh

Without needing page reload.

🔐 Security Features
Passwords are hashed using bcryptjs.
JWT tokens ensure that only authenticated users access protected routes.
Admin-only routes prevent unauthorized candidate management.
Each voter can vote only once.

⚡ Quick Notes
Middleware ensures validation and authentication.
Routes separate concerns for clarity and maintainability.
MongoDB stores all user and vote data efficiently.
JWT makes the app stateless and secure.
