'use strict';
const express = require('express');

const Favorite = require('../models/favorites');

const router = express.Router();
const passport = require('passport');
const mongoose = require('mongoose');

// Protect endpoints using JWT Strategy
router.use(passport.authenticate('jwt', { session: false, failWithError: true }));

//get all favorites
router.get('/', (req, res, next) => {
  const userId = req.user.id;

  Favorite.find({ userId: userId })
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

//delete endpoint
router.delete('/', (req, res, next) => {
  const id = req.body.id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    const err = new Error('The `id` is not valid');
    err.status = 400;
    return next(err);
  }
  Favorite.findOneAndDelete(id)
    .then(() => {
      res.sendStatus(204).end();
    })
    .catch(err => next(err));
});

module.exports = router;