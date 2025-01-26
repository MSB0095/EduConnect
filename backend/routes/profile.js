const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Profile = require('../models/Profile');
const User = require('../models/User');

// Get current user profile
router.get('/me', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id }).populate('user', ['name', 'avatar']);
    if (!profile) {
      return res.status(404).json({ msg: 'Profile not found' });
    }
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Create or update profile
router.post('/', auth, async (req, res) => {
  const {
    institution,
    status,
    bio,
    interests,
    country,
    city,
    yearOfStudy,
    major,
    languages,
    skills
  } = req.body;

  const profileFields = {
    user: req.user.id,
    institution,
    status,
    bio,
    country,
    city,
    yearOfStudy,
    major,
    interests: Array.isArray(interests) ? interests : interests.split(',').map(item => item.trim()),
    languages: Array.isArray(languages) ? languages : languages.split(',').map(item => item.trim()),
    skills: Array.isArray(skills) ? skills : skills.split(',').map(item => item.trim())
  };

  try {
    let profile = await Profile.findOne({ user: req.user.id });
    if (profile) {
      profile = await Profile.findOneAndUpdate(
        { user: req.user.id },
        { $set: profileFields },
        { new: true }
      ).populate('user', ['name', 'avatar']);
      return res.json(profile);
    }

    profile = new Profile(profileFields);
    await profile.save();
    profile = await Profile.findOne({ user: req.user.id }).populate('user', ['name', 'avatar']);
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
