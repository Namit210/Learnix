const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true,"please add user name"],
    trim: true
  },
  email: {
    type: String,
    required:[true,"please add user email"],
    unique: [true,"this email already taken"],
    lowercase: true
  },
  phone: {
    type: String,
    required: [true,"please add user phone no."],
  },
  address: {
    type: String,
    required:[true,"please add user address"]
  },
  password: {
    type: String,
    required: [true,"please add user password"]
  },
  role: {
    type: String,
    enum: ['admin', 'student'],
    default: 'student'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('User', userSchema);
