'use strict';

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  username: { type: String, require: true, unique: true },
  password: { type: String, required: true }
});

userSchema.methods.validatePassword = function (password) {
  return bcrypt.compare(password, this.password);
};

userSchema.statics.hashPassword = password => {
  return bcrypt.hash(password, 11);
};

userSchema.set('toObject', {
  virtuals: true,
  versionKey: false,
  transform: (doc, result) => {
    delete result._id;
    delete result.__v;
    delete result.password;
  }
});

module.exports = mongoose.model('User', userSchema);
