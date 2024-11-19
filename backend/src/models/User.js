const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['Customer', 'Talent'],
    required: true
  },
  postedFullTimeJobs: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'FullTimeJob'
  }],
  postedFreelanceJobs: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'FreelanceJob'
  }],
}, {
  timestamps: true 
});

const User = mongoose.model('User', userSchema);
module.exports = User;
