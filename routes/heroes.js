'use strict';
const express = require('express');
const router = express.Router();
const axios = require('axios');

const Heroes = require('../models/heroes');

router.get('/herostats', async (req, res) => {
  // axios
  //   .get('https://api.opendota.com/api/herostats')
  //   .then(async response => {
  // await Heroes.collection.insert(response.data)

  // console.log('heroes bulk done')

  const int = await Heroes.find({ primary_attr: 'int' });
  const agi = await Heroes.find({ primary_attr: 'agi' });
  const str = await Heroes.find({ primary_attr: 'str' });

  const heroes = {
    int,
    str,
    agi,
  };

  // for (let i = 0; i < response.data.length; i++) {
  //   const item = response.data[i];
  //   heroes[item.primary_attr].push(item);
  // }
  res.json(heroes);
  //console.log(heroes);
  // })
  // .catch(err => console.log(err));
});
//get single hero
router.get('/heroes/:id', (req, res) => {
  const id = parseInt(req.params.id);
  Heroes.findOne({ id })
    .then(hero => {
      if (hero) {
        res.json(hero);
      } else {
        res.sendStatus(404);
      }
    })
    .catch(err => console.error(err));
  // axios.get('https://api.opendota.com/api/herostats')
  //   .then(response => {
  //     const hero = response.data.find(el => el.id === parseInt(req.params.id));
  //     //console.log(hero);
  //     if (hero) {
  //       res.json(hero);
  //     } else {
  //       res.sendStatus(404);
  //     }
  //   });
});

router.get('/heroes/:id/matchups', (req, res) => {
  const { id } = req.params;
  axios
    .get(`https://api.opendota.com/api/heroes/${id}/matchups`)
    .then(response => {
      response.data; //all the data
      let high_hero_id = 0;
      let low_hero_id = 0;
      let highWinRate = 0;
      let lowWinRate = 100;

      //finding highest win rate
      for (let i = 0; i < response.data.length; i++) {
        const item = response.data[i];
        if (item.games_played > 10) {
          let winRate = item.wins / item.games_played;
          if (winRate > highWinRate) {
            highWinRate = winRate;
            high_hero_id = item.hero_id;
          }
        }
      }
      //finding lowest winrate
      for (let i = 0; i < response.data.length; i++) {
        const item = response.data[i];
        if (item.games_played > 10) {
          let winRate = item.wins / item.games_played;
          if (winRate < lowWinRate) {
            lowWinRate = winRate;
            low_hero_id = item.hero_id;
          }
        }
      }
      let highestAndLowestWinRate = [
        { highwinrateid: high_hero_id, lowwinrateid: low_hero_id },
      ];
      // console.log(highestAndLowestWinRate);

      res.json(highestAndLowestWinRate);
    })
    .catch(err => console.log(err));
});

module.exports = router;