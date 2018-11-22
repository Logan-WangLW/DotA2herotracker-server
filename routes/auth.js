'use strict';
const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');

const router = express.Router();

const { JWT_SECRET, JWT_EXPIRY } = require('../config.js');
const User = require('../models/user');
const options = { session: false, failWithError: true };
const localAuth = passport.authenticate('local', options);

// function createAuthToken({ _id: id, username }) {
function createAuthToken(user) {
  // return jwt.sign({ user: { id, username } },
  return jwt.sign({ user },
    JWT_SECRET,
    {
      subject: user.username,
      expiresIn: JWT_EXPIRY,
      algorithm: 'HS256'
    });
}

const jwtAuth = passport.authenticate('jwt', { session: false, failWithError: true });

//login end point
router.post('/', localAuth, (req, res) => {
  const authToken = createAuthToken(req.user);
  res.json({ authToken });
});
//refresh
router.post('/refresh', jwtAuth, (req, res) => {
  // console.log(jwtAuth);
  // User.findOne({ username: req.user.username })
  //   .then(user => {
  const authToken = createAuthToken(req.user);
  res.json({ authToken });
  // });

});

module.exports = router;