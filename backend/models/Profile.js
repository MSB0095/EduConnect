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
  country: {
    type: String,
    required: true
  },
  city: {
    type: String
  },
  yearOfStudy: {
    type: String
  },
  major: {
    type: String
  },
  languages: [{
    type: String
  }],
  skills: [{
    type: String
  }],
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Profile', ProfileSchema);
