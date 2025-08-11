# Learnix - Learning Management System

A comprehensive Learning Management System built with Node.js/Express backend and React frontend.

## 🏗️ Project Structure

### Backend Structure (Team-Based Development)

```
backend/
├── src/
│   ├── modules/
│   │   ├── auth/           # 👤 Person 1 - User & Authentication
│   │   ├── courses/        # 👤 Person 2 - Course & Module Management
│   │   ├── content/        # 👤 Person 3 - Content & QnA Handling
│   │   └── reviews/        # 👤 Person 4 - Reviews, Comments & Integration
│   ├── shared/
│   │   ├── middleware/
│   │   ├── utils/
│   │   ├── config/
│   │   └── database/
│   ├── app.js
│   └── server.js
├── package.json
└── .env
```

### Frontend Structure

```
frontend/
├── src/
│   ├── components/
│   ├── pages/
│   ├── services/
│   ├── utils/
│   └── styles/
├── package.json
└── public/
```

## 👥 Team Responsibilities

### 👤 Person 1 – User & Authentication Module
**Folder:** `backend/src/modules/auth/`
- User model/schema (Educational Info, Personal Details, PasswordHash, Timestamp)
- JWT authentication setup
- User registration, login, and profile update
- Password encryption (bcrypt)
- Auth validation middleware

**Routes:**
- POST /register
- POST /login
- GET /user/:id
- PUT /user/:id

### 👤 Person 2 – Course & Module Management
**Folder:** `backend/src/modules/courses/`
- Course and Module schemas
- Create/update/delete courses
- Add modules to courses
- Track completion and stars
- Admin roles and permission checks

**Routes:**
- POST /courses
- GET /courses/:id
- POST /courses/:id/modules
- PUT /modules/:id
- POST /modules/:id/complete

### 👤 Person 3 – Content & QnA Handling
**Folder:** `backend/src/modules/content/`
- PDFContent, VideoContent, AudioContent, TextContent schemas
- QnA feature implementation
- File upload handling (Multer)
- Content management logic

**Routes:**
- POST /modules/:id/content
- GET /modules/:id/content
- POST /modules/:id/qna
- GET /modules/:id/qna

### 👤 Person 4 – Reviews, Comments & Integration
**Folder:** `backend/src/modules/reviews/`
- Reviews and Comments schemas
- Nested comment support
- Integration of all modules
- Test endpoints
- Validation/middleware/logging assistance

**Routes:**
- POST /modules/:id/reviews
- POST /modules/:id/comments
- GET /modules/:id/comments
- GET /modules/:id/reviews

## 🚀 Getting Started

### Backend Setup
```bash
cd backend
npm install
npm run dev
```

### Frontend Setup
```bash
cd frontend
npm install
npm start
```

## 📋 Development Guidelines

1. Each team member works in their designated module folder
2. Use shared middleware and utilities from `backend/src/shared/`
3. Follow consistent API response formats
4. Implement proper error handling and validation
5. Write tests for your modules
6. Use environment variables for configuration

## 🔧 Tech Stack

**Backend:**
- Node.js/Express
- MongoDB/Mongoose
- JWT for authentication
- Multer for file uploads
- bcrypt for password hashing

**Frontend:**
- React
- Axios for API calls
- React Router for navigation
- CSS/SCSS for styling
