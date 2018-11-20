'use strict';
const express = require('express');

const Favorite = require('../models/favorites');

const router = express.Router();
const passport = require('passport');
const bodyParser = require('body-parser');

// Protect endpoints using JWT Strategy
router.use('/', passport.authenticate('jwt', { session: false, failWithError: true }));

router.use(bodyParser.json());

//get all favorites
router.get('/', (req, res, next) => {

  Favorite.find({ userId: req.user.id })
    .then(results => {
      res.json(results);
    })
    .catch(err => {
      next(err);
    });
});

//post/create favorite
router.post('/', (req, res, next) => {
  const { heroes } = req.body;
  const userId = req.user.id;
  const newObj = { heroes, userId };

  Favorite.create(newObj)
    .then(result => {
      res
        .location(`${req.originalUrl}/${result.id}`)
        .status(201)
        .json(result);
    })
    .catch(err => {
      next(err);
    });
});

module.exports = router;