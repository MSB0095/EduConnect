const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const auth = require('../middleware/auth');
const User = require('../models/User');
const path = require('path');

const storage = multer.diskStorage({
  destination: 'uploads/profile',
  filename: function(req, file, cb) {
    cb(null, 'PROFILE-' + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 },
  fileFilter: function(req, file, cb) {
    checkFileType(file, cb);
  }
}).single('avatar');

function checkFileType(file, cb) {
  const filetypes = /jpeg|jpg|png/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);
  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb('Error: Images Only!');
  }
}

router.post('/register', async (req, res) => {
  // Debug logging
  console.log('Registration request received:', {
    body: req.body,
    contentType: req.headers['content-type']
  });

  try {
    const { username, firstName, lastName, email, password } = req.body;

    // Validate input
    const requiredFields = { username, firstName, lastName, email, password };
    const missingFields = Object.keys(requiredFields).filter(key => !requiredFields[key]);
    
    if (missingFields.length > 0) {
      console.log('Missing fields:', missingFields);
      return res.status(400).json({
        msg: 'Missing required fields',
        missingFields
      });
    }

    // Check for existing user
    const existingUser = await User.findOne({
      $or: [{ email }, { username }]
    });

    if (existingUser) {
      return res.status(400).json({
        msg: `User already exists with this ${existingUser.email === email ? 'email' : 'username'}`
      });
    }

    // Create new user
    const user = new User({
      username,
      firstName,
      lastName,
      email,
      password
    });

    // Hash password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    // Save user
    await user.save();

    // Create token
    const payload = {
      user: {
        id: user.id
      }
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '24h' },
      (err, token) => {
        if (err) throw err;
        res.json({
          token,
          user: {
            id: user.id,
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email
          }
        });
      }
    );

  } catch (err) {
    console.error('Registration error:', err);
    if (err.name === 'ValidationError') {
      return res.status(400).json({
        msg: 'Validation Error',
        errors: Object.values(err.errors).map(e => e.message)
      });
    }
    res.status(500).json({ msg: 'Server Error', error: err.message });
  }
});

router.post('/upload-avatar', auth, (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ msg: err });
    }
    if (!req.file) {
      return res.status(400).json({ msg: 'No file uploaded' });
    }
    try {
      const user = await User.findById(req.user.id);
      user.avatar = `/uploads/profile/${req.file.filename}`;
      await user.save();
      res.json(user);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });
});

module.exports = router;
