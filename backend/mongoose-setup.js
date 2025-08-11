const mongoose = require('mongoose');

// Connection string
const CONNECTION_STRING = 'mongodb+srv://amitchausali9:xw3Gko5r9lC1nsMu@lmscluster.o8wusjq.mongodb.net/learning_platform?retryWrites=true&w=majority';

// User Schema
const userSchema = new mongoose.Schema({
    name: { type: String, required: true, minlength: 1 },
    email: { type: String, required: true, match: /^.+@.+$/, unique: true },
    phone: String,
    address: String,
    password: { type: String, required: true, minlength: 6 },
    role: { type: String, required: true, enum: ['admin', 'student'] },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

// Student Schema
const studentSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    education: String,
    timestamp: { type: Date, default: Date.now }
});

// Admin Schema
const adminSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    idProof: String,
    specialization: String
});

// Course Schema
const courseSchema = new mongoose.Schema({
    name: { type: String, required: true, minlength: 1 },
    duration: { type: Number, min: 0 },
    price: { type: Number, min: 0 },
    category: { type: String, required: true },
    total_modules: { type: Number, min: 0 },
    admin_list: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Admin' }],
    description: String,
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

// Course Stats Schema
const courseStatsSchema = new mongoose.Schema({
    course_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true, unique: true },
    total_enrolled: { type: Number, min: 0, default: 0 },
    featured: { type: Boolean, default: false },
    skills: [String],
    xp: { type: Number, min: 0, default: 0 },
    stars: { type: Number, min: 0, max: 5, default: 0 }
});

// Module Schema
const moduleSchema = new mongoose.Schema({
    course_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
    topic: { type: String, required: true },
    mod_num: { type: Number, required: true, min: 1 },
    duration: { type: Number, min: 0 },
    pdf: String,
    video: String,
    audio: String,
    completed: { type: Boolean, default: false },
    comment: String,
    xp: { type: Number, min: 0, default: 0 }
});

// User Course Schema
const userCourseSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    course_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
    percentage: { type: Number, min: 0, max: 100, default: 0 },
    enrolled_date: { type: Date, default: Date.now },
    last_accessed: Date
});

// Comment Schema
const commentSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    parent: { type: mongoose.Schema.Types.ObjectId, ref: 'Comment', default: null },
    statement: { type: String, required: true, minlength: 1 },
    timestamp: { type: Date, default: Date.now }
});

// User Comment Schema
const userCommentSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    comm_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Comment', required: true },
    mod_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Module' }
});

// Logs Schema
const logSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    timestamp: { type: Date, default: Date.now },
    activity: { type: String, required: true }
});

// Student Stats Schema
const studStatsSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    streak: { type: Number, min: 0, default: 0 },
    skills: [String],
    badges: [String],
    xp: { type: Number, min: 0, default: 0 },
    hours: { type: Number, min: 0, default: 0 },
    courses_done: { type: Number, min: 0, default: 0 }
});

// Create Models
const User = mongoose.model('User', userSchema);
const Student = mongoose.model('Student', studentSchema);
const Admin = mongoose.model('Admin', adminSchema);
const Course = mongoose.model('Course', courseSchema);
const CourseStats = mongoose.model('CourseStats', courseStatsSchema);
const Module = mongoose.model('Module', moduleSchema);
const UserCourse = mongoose.model('UserCourse', userCourseSchema);
const Comment = mongoose.model('Comment', commentSchema);
const UserComment = mongoose.model('UserComment', userCommentSchema);
const Log = mongoose.model('Log', logSchema);
const StudStats = mongoose.model('StudStats', studStatsSchema);

// Add indexes
moduleSchema.index({ course_id: 1, mod_num: 1 }, { unique: true });
userCourseSchema.index({ user_id: 1, course_id: 1 }, { unique: true });
courseSchema.index({ name: 'text', description: 'text' });

async function setupDatabase() {
    try {
        // Connect to MongoDB
        await mongoose.connect(CONNECTION_STRING);
        console.log('✅ Connected to MongoDB Atlas using Mongoose');

        // Insert sample data
        console.log('Creating sample data...');
        
        // Create sample user
        const sampleUser = new User({
            name: "John Doe",
            email: "john@example.com",
            phone: "+1234567890",
            address: "123 Main St",
            password: "hashed_password_here",
            role: "student"
        });
        const savedUser = await sampleUser.save();
        
        // Create sample student
        const sampleStudent = new Student({
            user_id: savedUser._id,
            education: "Bachelor's in Computer Science"
        });
        await sampleStudent.save();
        
        // Create sample admin user
        const adminUser = new User({
            name: "Admin User",
            email: "admin@example.com",
            phone: "+1234567891",
            address: "456 Admin St",
            password: "hashed_admin_password",
            role: "admin"
        });
        const savedAdmin = await adminUser.save();
        
        // Create admin record
        const adminRecord = new Admin({
            user_id: savedAdmin._id,
            idProof: "ADMIN123456",
            specialization: "Web Development"
        });
        await adminRecord.save();
        
        // Create sample course
        const sampleCourse = new Course({
            name: "Introduction to JavaScript",
            duration: 40,
            price: 99.99,
            category: "Programming",
            total_modules: 3,
            admin_list: [savedAdmin._id],
            description: "Learn JavaScript fundamentals from scratch"
        });
        const savedCourse = await sampleCourse.save();
        
        // Create course stats
        const courseStats = new CourseStats({
            course_id: savedCourse._id,
            total_enrolled: 0,
            featured: true,
            skills: ["JavaScript", "Programming", "Web Development"],
            xp: 500,
            stars: 4.5
        });
        await courseStats.save();
        
        // Create sample modules
        const modules = [
            {
                course_id: savedCourse._id,
                topic: "JavaScript Basics",
                mod_num: 1,
                duration: 15,
                pdf: "/pdfs/js-basics.pdf",
                video: "/videos/js-basics.mp4",
                audio: "/audio/js-basics.mp3",
                comment: "Introduction to JavaScript syntax",
                xp: 100
            },
            {
                course_id: savedCourse._id,
                topic: "Variables and Data Types",
                mod_num: 2,
                duration: 12,
                pdf: "/pdfs/js-variables.pdf",
                video: "/videos/js-variables.mp4",
                audio: "/audio/js-variables.mp3",
                comment: "Understanding JavaScript data types",
                xp: 150
            },
            {
                course_id: savedCourse._id,
                topic: "Functions and Scope",
                mod_num: 3,
                duration: 13,
                pdf: "/pdfs/js-functions.pdf",
                video: "/videos/js-functions.mp4",
                audio: "/audio/js-functions.mp3",
                comment: "Working with JavaScript functions",
                xp: 250
            }
        ];
        
        await Module.insertMany(modules);
        
        // Create student stats
        const studentStats = new StudStats({
            user_id: savedUser._id,
            streak: 0,
            skills: [],
            badges: [],
            xp: 0,
            hours: 0,
            courses_done: 0
        });
        await studentStats.save();
        
        console.log('✅ Database setup completed successfully!');
        console.log('✅ Sample data inserted');
        
        // List all collections
        const collections = await mongoose.connection.db.listCollections().toArray();
        console.log('Created collections:', collections.map(c => c.name));
        
    } catch (error) {
        console.error('❌ Error setting up database:', error);
    } finally {
        await mongoose.disconnect();
    }
}

// Run the setup
setupDatabase().catch(console.error);

module.exports = {
    User, Student, Admin, Course, CourseStats, Module,
    UserCourse, Comment, UserComment, Log, StudStats
};
