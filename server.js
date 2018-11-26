'use strict';

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const morgan = require('morgan');
const passport = require('passport');
const bodyParser = require('body-parser');
const { PORT, CLIENT_ORIGIN } = require('./config');
const { dbConnect } = require('./db-mongoose');

const usersRouter = require('./routes/users.js');
const authRouter = require('./routes/auth.js');
const favoriteRouter = require('./routes/favorites.js');
const heroesRouter = require('./routes/heroes.js');
const localStrategy = require('./passport/local.js');
const jwtStrategy = require('./passport/jwt.js');

mongoose.Promise = global.Promise;

const app = express();
app.use(bodyParser.json());


app.use(
  morgan(process.env.NODE_ENV === 'production' ? 'common' : 'dev', {
    skip: (req, res) => process.env.NODE_ENV === 'test'
  })
);

app.use(
  cors({
    origin: CLIENT_ORIGIN
  })
);

passport.use(localStrategy);
passport.use(jwtStrategy);

//Test server endpoint
app.get('/api/goodmorning', (req, res) => {
  res.send('goodmorning');
});

// Mount Routers
app.use('/register', usersRouter);
app.use('/auth', authRouter);
app.use('/favorites', favoriteRouter);
app.use('/', heroesRouter);

function runServer(port = PORT) {
  const server = app
    .listen(port, () => {
      console.info(`App listening on port ${server.address().port}`);
    })
    .on('error', err => {
      console.error('Express failed:');
      console.error(err);
    });
}

if (require.main === module) {
  dbConnect();
  runServer();
}

module.exports = { app };
