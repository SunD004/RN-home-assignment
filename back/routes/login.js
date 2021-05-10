var express = require('express');
var router = express.Router();
var lodash = require('lodash');
var sha256 = require('sha256')

var tableUsers = require('../models/users')

router.post('/', async function (req, res, next) {
  try {
    const user = await tableUsers.findOne({
      username: req.body.username,
      password: sha256(req.body.password)
    });
    console.log('login user found=', user)
    if (lodash.isEmpty(user))
      res.sendStatus(404)
    else res.send(user._id)
  } catch (e) {
    console.log(e)
    res.sendStatus(404)
  }
});

module.exports = router;