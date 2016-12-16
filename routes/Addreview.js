
var express = require('express');
var router = express.Router();

/* GET ShowNearPlace page. */



router.get('/', function(req, res, next) {
    res.render('Addreview',{ title: 'Addreview' });
});

module.exports = router;
