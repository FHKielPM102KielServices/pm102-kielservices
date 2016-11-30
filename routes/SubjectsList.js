
var express = require('express');
var router = express.Router();

/* GET ShowNearPlace page. */
router.get('/', function(req, res, next) {
    res.render('SubjectsList',{ title: 'Services' });
});

module.exports = router;
