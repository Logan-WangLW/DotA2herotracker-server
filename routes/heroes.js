'use strict';
const express = require('express');
const router = express.Router();
const axios = require('axios');

router.get('/herostats', (req, res) => {
  axios.get('https://api.opendota.com/api/herostats')
    .then(response => {
      res.json(response.data);
    });
});

router.get('/heroes/:id/matchups', (req, res) => {
  const { id } = req.params;
  axios.get(`https://api.opendota.com/api/heroes/${id}/matchups`)
    .then(response => {
      res.json(response.data);
    });
});

module.exports = router;