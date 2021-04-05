const express = require('express');
const authRouter = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const verifyToken = require('../middleware/auth');
const { check, validationResult } = require('express-validator');

const User = require('../models/User');

// @route       GET /api/auth
// @descr       Get logged-in user
// @access      Private
authRouter.get('/', verifyToken, async (req, res) => {
  try {
    // 1. Get the user from the database
    const user = await User.findById(req.user.id).select('-password');

    res.send({ user });
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ msg: 'Server Error' });
  }
});

// @route       POST /api/auth
// @descr       Auth user & get token
// @access      Public
authRouter.post(
  '/',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      // 1. Check if the user exists in the database.
      let user = await User.findOne({ email });
      // 2. If there is no user, return early with error message.
      if (!user) {
        return res.status(400).send({ msg: 'Invalid Credentials!' });
      }
      // 3. Check password accuracy using bcrypt compare.
      //    If password is incorrect, return early with error message.
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).send({ msg: 'Invalid Credentials!' });
      }
      // 4. Generate and send token.
      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        {
          expiresIn: 360000,
        },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (error) {
      console.error(error.message);
      res.status(500).send({ msg: 'Server Error' });
    }
  }
);

module.exports = authRouter;
