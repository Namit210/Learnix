# Database Setup Guide for Team Members

## 🚀 Quick Start

This guide helps you set up the MongoDB database for the Learnix Learning Management System.

## 📋 Prerequisites

- Node.js (v16 or higher)
- MongoDB Atlas account (recommended) or local MongoDB installation
- Git access to this repository

## 🛠️ Setup Instructions

### Step 1: Clone the Repository
```bash
git clone https://github.com/Namit210/Learnix.git
cd Learnix/backend
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Configure Environment Variables
1. Copy the example environment file:
   ```bash
   cp env.example .env
   ```

2. Edit `.env` file with your MongoDB connection details:
   ```env
   MONGODB_URI=mongodb+srv://your-username:your-password@your-cluster.mongodb.net/?retryWrites=true&w=majority&appName=YourApp
   DB_NAME=learning_platform
   ```

### Step 4: Run Database Setup
```bash
npm run db:setup
```

Or run directly:
```bash
node src/shared/database/connection.js
```

## 🗄️ Database Structure

The setup script creates these collections:

| Collection | Purpose |
|------------|---------|
| `users` | User accounts (students & admins) |
| `students` | Student-specific information |
| `admin` | Admin-specific information |
| `courses` | Course catalog |
| `course_stats` | Course statistics & metadata |
| `modules` | Individual course modules |
| `user_course` | User enrollment data |
| `comments` | Course/module comments |
| `user_comment` | Comment relationships |
| `logs` | Activity logs |
| `stud_stats` | Student statistics |

## 🔧 Alternative Setup Options

### Option 1: Using Your Own MongoDB Atlas Cluster

1. Create a free MongoDB Atlas account at [mongodb.com](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster
3. Get your connection string
4. Update your `.env` file with the new connection string

### Option 2: Using Local MongoDB

1. Install MongoDB locally
2. Update your `.env` file:
   ```env
   MONGODB_URI=mongodb://localhost:27017/learning_platform
   ```

### Option 3: Using Docker

```bash
# Run MongoDB in Docker
docker run -d -p 27017:27017 --name mongodb mongo:latest

# Update .env file
MONGODB_URI=mongodb://localhost:27017/learning_platform
```

## 🛡️ Security Note

**⚠️ IMPORTANT**: Never commit your actual `.env` file to Git. The repository includes `.env` in `.gitignore` for security.

## 📝 Sample Data

The setup script includes sample data:
- Sample student user (john@example.com)
- Sample admin user (admin@example.com)
- Sample JavaScript course with 3 modules

## 🚨 Troubleshooting

### Common Issues:

1. **Connection Timeout**
   - Check your internet connection
   - Verify MongoDB Atlas IP whitelist settings

2. **Authentication Failed**
   - Verify username/password in connection string
   - Check if user has proper database permissions

3. **SSL/TLS Errors**
   - Try using `tlsAllowInvalidCertificates=true` in connection string (development only)
   - Check firewall settings

### Getting Help:

- Check the terminal output for specific error messages
- Verify your MongoDB Atlas cluster is running
- Make sure your IP is whitelisted in MongoDB Atlas

## 🔄 Re-running Setup

If you need to reset the database:
1. Delete the database from MongoDB Atlas/local MongoDB
2. Run the setup script again

## 📞 Contact

If you encounter issues, contact the project maintainer or create an issue in the repository.
