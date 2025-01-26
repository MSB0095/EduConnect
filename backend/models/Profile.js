const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  institution: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true
  },
  bio: {
    type: String
  },
  interests: [{
    type: String
  }],
  social: {
    youtube: String,
    twitter: String,
    linkedin: String
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Profile', ProfileSchema);
