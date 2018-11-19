'use strict';

const mongoose = require('mongoose');

const { DATABASE_URL } = require('../config');

const Favorite = require('../models/favorites');
const User = require('../models/user');

const { users, favorites } = require('../db/data');

console.log(`Connecting to mongodb at ${DATABASE_URL}`);
mongoose.connect(DATABASE_URL, { useNewUrlParser: true })
  .then(() => {
    console.info('Deleting Data...');
    return Promise.all([
      Favorite.deleteMany(),
      User.deleteMany()
    ]);
  })
  .then(() => {
    console.info('Seeding Database...');
    return Promise.all([
      Favorite.insertMany(favorites),
      User.insertMany(users)
    ]);
  })
  .then(results => {
    console.log('Inserted', results);
    console.info('Disconnecting...');
    return mongoose.disconnect();
  })
  .catch(err => {
    console.error(err);
    return mongoose.disconnect();
  });
