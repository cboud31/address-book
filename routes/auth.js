const express = require('express');
const authRouter = express.Router();

// @route       GET /api/auth
// @descr       Get logged-in user
// @access      Private
authRouter.get('/', (req, res) => {
  res.send('Get logged-in user');
});

// @route       POST /api/auth
// @descr       Auth user & get token
// @access      Public
authRouter.post('/', (req, res) => {
  res.send('Auth user & get token');
});

module.exports = authRouter;
