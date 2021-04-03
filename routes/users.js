const { genSalt } = require('bcryptjs');
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
// const config = require('');
const usersRouter = express.Router();
const { check, validationResult } = require('express-validator');
const User = require('../models/User');

// @route       POST /api/users
// @descr       Register a new user
// @access      Public
usersRouter.post(
  '/',
  [
    check('name', 'Required field(s) missing').not().isEmpty(),
    check('email', 'Please enter a valid email').isEmail(),
    check('password', 'Password must contain 8 or more characters').isLength({
      min: 8,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, password } = req.body;

    try {
      // 1. Check if user already exists
      let user = await User.findOne({ email });
      // 2. If user exists, return early and send error
      if (user) {
        return res.status(400).json({ msg: 'User already exists' });
      }

      // 3. Create new user
      user = new User({
        name,
        email,
        password,
      });
      // 4. Generate hashed password and save to new user
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      // 5. Save user in the database
      await user.save();
      // 6. Generate and return json web token
      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(payload);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error!');
    }
  }
);

module.exports = usersRouter;
