var express = require('express');
var router = express.Router();
var axios = require('axios')
var _ = require('lodash');

var redisClient = require('../redis-client')
var { WEATHER_URL, WHEATHER_KEY } = require('../config')


router.post('/', async function (req, res) {
  try {
    console.log('searchCity =', req.body)
    await redisClient.get(req.body.search, async (_, recipe) => {
      try {
        if (recipe !== null) {
          return res.status(200).send(JSON.parse(recipe))
        } else {
          const ret = await axios.get(`${WEATHER_URL}weather?q=${req.body.search}&appid=${WHEATHER_KEY}&units=metric`)
          if (ret.data.coord === null) {
            return res.status(400).send({ message: 'Failed to fetch weather, try again' })
          } else {
            redisClient.setex(req.body.search, 3600, JSON.stringify(ret.data));
            return res.send(ret.data)
          }
        }
      } catch (e) {
        res.status(400).send({ message: e.response.data.message })
      }
    })

  } catch (e) {
    res.status(400).send({ message: 'Failed' })
  }
});

module.exports = router;