// MongoDB Database Setup Script
// Run this script to create your entire database structure automatically

require('dotenv').config();
const { MongoClient } = require('mongodb');

// Use environment variable or fallback to default
const CONNECTION_STRING = process.env.MONGODB_URI || 'mongodb+srv://amitchausali9:xw3Gko5r9lC1nsMu@lmscluster.o8wusjq.mongodb.net/?retryWrites=true&w=majority&appName=lmsCluster';
const DATABASE_NAME = process.env.DB_NAME || 'learning_platform';

async function createDatabase() {
    let client;
    
    try {
        // Connect to MongoDB
        client = new MongoClient(CONNECTION_STRING, {
            serverSelectionTimeoutMS: 30000,
            connectTimeoutMS: 30000,
        });
        await client.connect();
        console.log('Connected to MongoDB Atlas');
        
        const db = client.db(DATABASE_NAME);
        
        
        await createCollectionsWithValidation(db);
        
        
        await createIndexes(db);
        
      
        await insertSampleData(db);
        
        console.log('Database setup completed successfully!');
        
    } catch (error) {
        console.error('Error setting up database:', error);
    } finally {
        if (client) {
            await client.close();
        }
    }
}

async function createCollectionsWithValidation(db) {
    console.log('Creating collections with validation...');
    
    // Users Collection
    await db.createCollection('users', {
        validator: {
            $jsonSchema: {
                bsonType: "object",
                required: ["name", "email", "role"],
                properties: {
                    name: { bsonType: "string", minLength: 1 },
                    email: { bsonType: "string", pattern: "^.+@.+$" },
                    phone: { bsonType: "string" },
                    address: { bsonType: "string" },
                    password: { bsonType: "string", minLength: 6 },
                    role: { bsonType: "string", enum: ["admin", "student"] },
                    createdAt: { bsonType: "date" },
                    updatedAt: { bsonType: "date" }
                }
            }
        }
    });
    
    // Students Collection
    await db.createCollection('students', {
        validator: {
            $jsonSchema: {
                bsonType: "object",
                required: ["user_id"],
                properties: {
                    user_id: { bsonType: "objectId" },
                    education: { bsonType: "string" },
                    timestamp: { bsonType: "date" }
                }
            }
        }
    });
    
    // Admin Collection
    await db.createCollection('admin', {
        validator: {
            $jsonSchema: {
                bsonType: "object",
                required: ["user_id"],
                properties: {
                    user_id: { bsonType: "objectId" },
                    idProof: { bsonType: "string" },
                    specialization: { bsonType: "string" }
                }
            }
        }
    });
    
    // Courses Collection
    await db.createCollection('courses', {
        validator: {
            $jsonSchema: {
                bsonType: "object",
                required: ["name", "category"],
                properties: {
                    name: { bsonType: "string", minLength: 1 },
                    duration: { bsonType: "number", minimum: 0 },
                    price: { bsonType: "number", minimum: 0 },
                    category: { bsonType: "string" },
                    total_modules: { bsonType: "number", minimum: 0 },
                    admin_list: { bsonType: "array", items: { bsonType: "objectId" } },
                    description: { bsonType: "string" },
                    createdAt: { bsonType: "date" },
                    updatedAt: { bsonType: "date" }
                }
            }
        }
    });
    
    // Course Stats Collection
    await db.createCollection('course_stats', {
        validator: {
            $jsonSchema: {
                bsonType: "object",
                required: ["course_id"],
                properties: {
                    course_id: { bsonType: "objectId" },
                    total_enrolled: { bsonType: "number", minimum: 0 },
                    featured: { bsonType: "bool" },
                    skills: { bsonType: "array", items: { bsonType: "string" } },
                    xp: { bsonType: "number", minimum: 0 },
                    stars: { bsonType: "number", minimum: 0, maximum: 5 }
                }
            }
        }
    });
    
    // Modules Collection
    await db.createCollection('modules', {
        validator: {
            $jsonSchema: {
                bsonType: "object",
                required: ["course_id", "topic", "mod_num"],
                properties: {
                    course_id: { bsonType: "objectId" },
                    topic: { bsonType: "string" },
                    mod_num: { bsonType: "number", minimum: 1 },
                    duration: { bsonType: "number", minimum: 0 },
                    pdf: { bsonType: "string" },
                    video: { bsonType: "string" },
                    audio: { bsonType: "string" },
                    completed: { bsonType: "bool" },
                    comment: { bsonType: "string" },
                    xp: { bsonType: "number", minimum: 0 }
                }
            }
        }
    });
    
    // User Course Collection
    await db.createCollection('user_course', {
        validator: {
            $jsonSchema: {
                bsonType: "object",
                required: ["user_id", "course_id"],
                properties: {
                    user_id: { bsonType: "objectId" },
                    course_id: { bsonType: "objectId" },
                    percentage: { bsonType: "number", minimum: 0, maximum: 100 },
                    enrolled_date: { bsonType: "date" },
                    last_accessed: { bsonType: "date" }
                }
            }
        }
    });
    
    // Comments Collection
    await db.createCollection('comments', {
        validator: {
            $jsonSchema: {
                bsonType: "object",
                required: ["user_id", "statement"],
                properties: {
                    user_id: { bsonType: "objectId" },
                    parent: { bsonType: ["objectId", "null"] },
                    statement: { bsonType: "string", minLength: 1 },
                    timestamp: { bsonType: "date" }
                }
            }
        }
    });
    
    // User Comment Collection
    await db.createCollection('user_comment', {
        validator: {
            $jsonSchema: {
                bsonType: "object",
                required: ["user_id", "comm_id"],
                properties: {
                    user_id: { bsonType: "objectId" },
                    comm_id: { bsonType: "objectId" },
                    mod_id: { bsonType: "objectId" }
                }
            }
        }
    });
    
    // Logs Collection
    await db.createCollection('logs', {
        validator: {
            $jsonSchema: {
                bsonType: "object",
                required: ["user_id", "activity"],
                properties: {
                    user_id: { bsonType: "objectId" },
                    timestamp: { bsonType: "date" },
                    activity: { bsonType: "string" }
                }
            }
        }
    });
    
    // Student Stats Collection
    await db.createCollection('stud_stats', {
        validator: {
            $jsonSchema: {
                bsonType: "object",
                required: ["user_id"],
                properties: {
                    user_id: { bsonType: "objectId" },
                    streak: { bsonType: "number", minimum: 0 },
                    skills: { bsonType: "array", items: { bsonType: "string" } },
                    badges: { bsonType: "array", items: { bsonType: "string" } },
                    xp: { bsonType: "number", minimum: 0 },
                    hours: { bsonType: "number", minimum: 0 },
                    courses_done: { bsonType: "number", minimum: 0 }
                }
            }
        }
    });
    
    console.log('✅ All collections created with validation');
}

async function createIndexes(db) {
    console.log('Creating indexes...');
    
    // Users indexes
    await db.collection('users').createIndex({ email: 1 }, { unique: true });
    await db.collection('users').createIndex({ role: 1 });
    
    // Students indexes
    await db.collection('students').createIndex({ user_id: 1 }, { unique: true });
    
    // Admin indexes
    await db.collection('admin').createIndex({ user_id: 1 }, { unique: true });
    
    // Courses indexes
    await db.collection('courses').createIndex({ category: 1 });
    await db.collection('courses').createIndex({ name: "text", description: "text" });
    await db.collection('courses').createIndex({ createdAt: -1 });
    
    // Course Stats indexes
    await db.collection('course_stats').createIndex({ course_id: 1 }, { unique: true });
    await db.collection('course_stats').createIndex({ featured: 1 });
    await db.collection('course_stats').createIndex({ stars: -1 });
    
    // Modules indexes
    await db.collection('modules').createIndex({ course_id: 1, mod_num: 1 }, { unique: true });
    await db.collection('modules').createIndex({ course_id: 1 });
    
    // User Course indexes
    await db.collection('user_course').createIndex({ user_id: 1, course_id: 1 }, { unique: true });
    await db.collection('user_course').createIndex({ user_id: 1 });
    await db.collection('user_course').createIndex({ course_id: 1 });
    
    // Comments indexes
    await db.collection('comments').createIndex({ timestamp: -1 });
    await db.collection('comments').createIndex({ user_id: 1 });
    await db.collection('comments').createIndex({ parent: 1 });
    
    // User Comment indexes
    await db.collection('user_comment').createIndex({ user_id: 1 });
    await db.collection('user_comment').createIndex({ mod_id: 1 });
    
    // Logs indexes
    await db.collection('logs').createIndex({ user_id: 1, timestamp: -1 });
    await db.collection('logs').createIndex({ timestamp: -1 });
    
    // Student Stats indexes
    await db.collection('stud_stats').createIndex({ user_id: 1 }, { unique: true });
    await db.collection('stud_stats').createIndex({ xp: -1 });
    
    console.log('✅ All indexes created');
}

async function insertSampleData(db) {
    console.log('Inserting sample data...');
    
    // Check if sample data already exists
    const existingUser = await db.collection('users').findOne({ email: "john@example.com" });
    if (existingUser) {
        console.log('⚠️  Sample data already exists, skipping insertion');
        return;
    }
    
    // Insert sample user
    const userResult = await db.collection('users').insertOne({
        name: "John Doe",
        email: "john@example.com",
        phone: "+1234567890",
        address: "123 Main St",
        password: "hashed_password_here", // Remember to hash in real app
        role: "student",
        createdAt: new Date(),
        updatedAt: new Date()
    });
    
    const userId = userResult.insertedId;
    
    // Insert student record
    await db.collection('students').insertOne({
        user_id: userId,
        education: "Bachelor's in Computer Science",
        timestamp: new Date()
    });
    
    // Insert sample admin user
    const adminUserResult = await db.collection('users').insertOne({
        name: "Admin User",
        email: "admin@example.com",
        phone: "+1234567891",
        address: "456 Admin St",
        password: "hashed_admin_password",
        role: "admin",
        createdAt: new Date(),
        updatedAt: new Date()
    });
    
    const adminUserId = adminUserResult.insertedId;
    
    // Insert admin record
    await db.collection('admin').insertOne({
        user_id: adminUserId,
        idProof: "ADMIN123456",
        specialization: "Web Development"
    });
    
    // Insert sample course
    const courseResult = await db.collection('courses').insertOne({
        name: "Introduction to JavaScript",
        duration: 40,
        price: 99.99,
        category: "Programming",
        total_modules: 3,
        admin_list: [adminUserId],
        description: "Learn JavaScript fundamentals from scratch",
        createdAt: new Date(),
        updatedAt: new Date()
    });
    
    const courseId = courseResult.insertedId;
    
    // Insert course stats
    await db.collection('course_stats').insertOne({
        course_id: courseId,
        total_enrolled: 0,
        featured: true,
        skills: ["JavaScript", "Programming", "Web Development"],
        xp: 500,
        stars: 4.5
    });
    
    // Insert sample modules
    await db.collection('modules').insertMany([
        {
            course_id: courseId,
            topic: "JavaScript Basics",
            mod_num: 1,
            duration: 15,
            pdf: "/pdfs/js-basics.pdf",
            video: "/videos/js-basics.mp4",
            audio: "/audio/js-basics.mp3",
            completed: false,
            comment: "Introduction to JavaScript syntax",
            xp: 100
        },
        {
            course_id: courseId,
            topic: "Variables and Data Types",
            mod_num: 2,
            duration: 12,
            pdf: "/pdfs/js-variables.pdf",
            video: "/videos/js-variables.mp4",
            audio: "/audio/js-variables.mp3",
            completed: false,
            comment: "Understanding JavaScript data types",
            xp: 150
        },
        {
            course_id: courseId,
            topic: "Functions and Scope",
            mod_num: 3,
            duration: 13,
            pdf: "/pdfs/js-functions.pdf",
            video: "/videos/js-functions.mp4",
            audio: "/audio/js-functions.mp3",
            completed: false,
            comment: "Working with JavaScript functions",
            xp: 250
        }
    ]);
    
    // Insert student stats
    await db.collection('stud_stats').insertOne({
        user_id: userId,
        streak: 0,
        skills: [],
        badges: [],
        xp: 0,
        hours: 0,
        courses_done: 0
    });
    
    console.log('✅ Sample data inserted');
}

// Run the setup
createDatabase().catch(console.error);

// Export for use in other files
module.exports = { createDatabase };