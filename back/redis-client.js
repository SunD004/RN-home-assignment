var redis = require('redis');
var client = redis.createClient(6379);

module.exports = client;