var express = require('express');
var router = express.Router();
var config = require('../config/appConfig');

console.log(config.mongo.url);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
