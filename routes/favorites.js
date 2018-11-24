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
  Favorite.find({ userId: req.user.id })
    .then(results => {
      res.json(results);
    })
    .catch(err => {
      next(err);
    });
});

//post/create favorite
router.post('/:id', (req, res, next) => {
  const newObj = { heroes: req.params.id, userId: req.user.id };

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
router.delete('/:id', (req, res, next) => {
  const id = req.params.id;
  Favorite.findByIdAndDelete(id)
    .then(() => {
      console.log('Deleted favorite:', id);
      return Favorite.find({ userId: req.user.id });
    })
    .then(results => {
      console.log('Leftover favorites:', results);
      res.json(results);
    })
    .catch(err => next(err));
});

module.exports = router;