# Database Upload Instructions

## Method 1: Using MongoDB Compass (Recommended for GUI users)

1. Download and install MongoDB Compass from: https://www.mongodb.com/products/compass

2. Connect using your connection string:
   `mongodb+srv://amitchausali9:xw3Gko5r9lC1nsMu@lmscluster.o8wusjq.mongodb.net/`

3. Create a new database called "learning_platform"

4. Manually create each collection with the validation rules from your script

## Method 2: Export as JSON and Import

Your connection.js script creates these collections:
- users
- students  
- admin
- courses
- course_stats
- modules
- user_course
- comments
- user_comment
- logs
- stud_stats

## Method 3: Fix Network Issues

If you're on a restricted network:
1. Try using a VPN
2. Try from a different network (mobile hotspot)
3. Contact your network administrator

## Method 4: Use MongoDB Shell

If you have MongoDB shell installed:
```bash
mongosh "mongodb+srv://amitchausali9:xw3Gko5r9lC1nsMu@lmscluster.o8wusjq.mongodb.net/"
```

Then run the database creation commands manually.
