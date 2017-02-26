var express = require('express');
var router = express.Router();

/* GET home page. */

router.get('/', function(req, res) {
  res.render('index', { title: 'Speed Gate - Emitter' });
});


router.get('/simulate', function(req, res) {
	res.render('simulate', { title: 'Simulate' });
});

module.exports = router;
