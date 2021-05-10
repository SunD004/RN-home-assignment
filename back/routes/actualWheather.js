var express = require('express');
var router = express.Router();
var axios = require('axios')
var _ = require('lodash');
var { WEATHER_URL, WHEATHER_KEY } = require('../config')

router.post('/', async function (req, res, next) {
  try {
    console.log('actualWheatherRouter body=', req.body)
    const ret = await axios.get(`${WEATHER_URL}weather?lat=${req.body.latitude}&lon=${req.body.longitude}&appid=${WHEATHER_KEY}`)
    if (_.isNull(ret.data.coord)) {
      res.status(400).send({ message: 'Failed to fetch weather, try again' })
    } else {
      res.send(ret.data)
    }
  } catch (e) {
    console.log(e)
    res.sendStatus(404)
  }
});

module.exports = router;