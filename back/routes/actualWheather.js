var express = require('express');
var router = express.Router();
var axios = require('axios')
var _ = require('lodash');

var { WEATHER_URL, WHEATHER_KEY } = require('../config')
var redisClient = require('../redis-client')

router.post('/', async function (req, res) {
  try {
    console.log('actualWheatherRouter body=', req.body)
    const tmp = { lat: req.body.latitude, lon: req.body.lon }
    await redisClient.get(JSON.stringify(tmp), async (_, recipe) => {
      try {
        if (recipe !== null) {
          return res.status(200).send(JSON.parse(recipe))
        } else {
          const ret = await axios.get(`${WEATHER_URL}weather?lat=${req.body.latitude}&lon=${req.body.longitude}&appid=${WHEATHER_KEY}&units=metric`)
          const daily = await axios.get(`${WEATHER_URL}onecall?lat=${req.body.latitude}&lon=${req.body.longitude}&exclude=minutely,hourly,current,alerts&appid=${WHEATHER_KEY}&units=metric`)
          if (ret.data.coord === null || !ret.daily === null) {
            res.status(400).send({ message: 'Failed to fetch weather, try again' })
          } else {
            const obj = ret.data
            obj.daily = daily.data.daily
            redisClient.setex(JSON.stringify(tmp), 3600, JSON.stringify(obj));
            return res.send(obj)
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