var express = require('express');
var router = express.Router();
var lodash = require('lodash');
var sha256 = require('sha256')

var tableUsers = require('../models/users')

router.post('/', async function (req, res) {
  try {
    const user = await tableUsers.find({
      email: req.body.email,
    });
    if (lodash.isEmpty(user)) {
      const ret = await tableUsers.create({
        email: req.body.email,
        username: req.body.username,
        password: sha256(req.body.password)
      })
      if (lodash.isEmpty(ret))
        res.status(400).send({ error: 'Creation failed' })
      else res.status(200).send('Sucess')
    } else {
      res.status(400).send({ error: 'User already exist' })
    }
  } catch (e) {
    console.log(e)
    res.sendStatus(404)
  }
});

module.exports = router;