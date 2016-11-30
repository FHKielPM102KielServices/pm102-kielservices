
var express = require('express');
var router = express.Router();

/* GET ShowNearPlace page. */



router.get('/:subject', function(req, res, next) {
    res.render('ShowNearPlace', { subject: req.params.subject});
});

module.exports = router;
