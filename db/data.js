'use strict';
const users = [
  {
    _id: '000000000000000000000001',
    username: 'loganxwang',
    //icefrog
    password: '$2a$10$yCJoRqJIZvo7vkg9jlrM5uimpKJFzoF9.n.n6flPPdX6K/6oqcmWe'
  },
  {
    _id: '000000000000000000000002',
    username: 'coldtoad',
    //verysecret
    password: '$2a$10$DhlAlEW7KX/KXIeT4OGzxODvB/JNcsKOH.99PzBG1t/7jT8KkUgnC'
  }
];

const favorites = [
  {
    _id: '111111111111111111111101',
    heroes: '1',
    userId: '000000000000000000000001'
  },
  {
    _id: '111111111111111111111102',
    heroes: '2',
    userId: '000000000000000000000001'
  },
  {
    _id: '111111111111111111111103',
    heroes: '3',
    userId: '000000000000000000000001'
  },
  {
    _id: '111111111111111111111104',
    heroes: '22',
    userId: '000000000000000000000002'
  },
  {
    _id: '111111111111111111111105',
    heroes: '35',
    userId: '000000000000000000000002'
  },
  {
    _id: '111111111111111111111106',
    heroes: '58',
    userId: '000000000000000000000002'
  }
];

module.exports = { users, favorites };