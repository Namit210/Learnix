# Learnix Backend

Learning Management System Backend API built with Node.js, Express, and MongoDB.

## 🚀 Quick Setup for Team Members

### 1. Clone & Install
```bash
git clone https://github.com/Namit210/Learnix.git
cd Learnix/backend
npm install
```

### 2. Configure Database
```bash
# Copy environment template
cp env.example .env

# Edit .env with your MongoDB connection string
# MONGODB_URI=mongodb+srv://your-username:your-password@your-cluster.mongodb.net/?retryWrites=true&w=majority&appName=YourApp
```

### 3. Setup Database
```bash
# Create database structure and add sample data
npm run db:setup

# Validate setup (optional)
npm run db:validate
```

### 4. Start Development
```bash
npm run dev
```

## 📋 Available Scripts

- `npm run dev` - Start development server with nodemon
- `npm start` - Start production server
- `npm run db:setup` - Initialize database with collections and sample data
- `npm run db:validate` - Check if database setup is working
- `npm test` - Run tests

## 🗄️ Database Information

- **Database Name**: `learning_platform`
- **Collections**: 11 collections with validation schemas
- **Sample Data**: Includes sample users, courses, and modules
- **Indexes**: Optimized for common query patterns

For detailed database setup instructions, see [DATABASE_SETUP.md](../DATABASE_SETUP.md)

## 🛠️ Development

### Project Structure
```
backend/
├── src/
│   ├── app.js              # Express app configuration
│   ├── server.js           # Server entry point
│   ├── modules/
│   │   └── auth/           # Authentication module
│   └── shared/
│       ├── database/       # Database configuration
│       ├── middleware/     # Express middleware
│       └── utils/          # Utility functions
├── env.example             # Environment variables template
└── package.json
```

### Adding New Features
1. Create feature modules in `src/modules/`
2. Add middleware in `src/shared/middleware/`
3. Update database schemas in `src/shared/database/`

## 🔐 Environment Variables

Required environment variables (see `env.example`):

- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - Secret key for JWT tokens
- `PORT` - Server port (default: 5000)

## 🚨 Troubleshooting

### Database Connection Issues
1. Check if your IP is whitelisted in MongoDB Atlas
2. Verify MongoDB cluster is running
3. Confirm connection string is correct
4. Run `npm run db:validate` to test connection

### Common Errors
- **SSL/TLS errors**: Check network/firewall settings
- **Authentication failed**: Verify MongoDB credentials
- **Connection timeout**: Check internet connection

## 📞 Support

- Create an issue in the repository for bugs
- Contact project maintainer for urgent issues
- Check [DATABASE_SETUP.md](../DATABASE_SETUP.md) for detailed setup help

## 📄 License

MIT License - see LICENSE file for details.
