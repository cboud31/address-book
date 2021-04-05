const jwt = require('jsonwebtoken');
const config = require('config');

const verifyToken = (req, res, next) => {
  // 1. Get the token from the header
  const token = req.header('x-auth-token');

  // 2. Check if token exists
  if (!token) {
    return res.status(401).send({ msg: 'Unauthorized Access (missing token)' });
  }
  // 3. Verify token, then assign user to req object
  try {
    const decoded = jwt.verify(token, config.get('jwtSecret'));

    req.user = decoded.user;
    next();
  } catch (error) {
    res.status(401).send({ msg: 'Unauthorized Access (invalid token)' });
  }
};

module.exports = verifyToken;
