'use strict';
const mongoose = require('mongoose');

const schema = mongoose.Schema({
  heroes: Array,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

schema.set('timestamps', true);

schema.set('toJSON', {
  virtuals: true,
  transform: (doc, result) => {
    delete result._id;
    delete result.__v;
  }
});

module.exports = mongoose.model('Favorite', schema);