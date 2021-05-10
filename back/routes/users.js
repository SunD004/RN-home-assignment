var express = require('express');
var router = express.Router();
var mongoose = require('mongoose')
var lodash = require('lodash');
var sha256 = require('sha256')

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
})
const table = mongoose.model('users', userSchema)

/* GET users listing. */
router.get('/', async function (req, res, next) {
  try {
    const user = await table.find({
      name: 'lol',
      password: sha256('ok')
    });
    if (lodash.isEmpty(user))
      res.sendStatus(404)
    else res.sendStatus(200)
  } catch (e) {
    console.log(e)
    res.sendStatus(404)
  }
});

module.exports = router;
