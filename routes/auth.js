'use strict';
const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');

const router = express.Router();

const { JWT_SECRET, JWT_EXPIRY } = require('../config.js');

const options = { session: false, failWithError: true };
const localAuth = passport.authenticate('local', options);

function createAuthToken(user) {
  return jwt.sign({ user: { id: user._id } },
    JWT_SECRET,
    {
      subject: user.username,
      expiresIn: JWT_EXPIRY,
      algorithm: 'HS256'
    });
}

const jwtAuth = passport.authenticate('jwt', { session: false, failWithError: true });

router.post('/refresh', jwtAuth, (req, res) => {
  const authToken = createAuthToken(req.user);
  res.json({ authToken });
});

// ========================= POST login endpoint ==================== //
router.post('/', localAuth, (req, res) => {
  const authToken = createAuthToken(req.user);
  res.json({ authToken });
});

module.exports = router;