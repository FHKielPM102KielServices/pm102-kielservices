var express = require('express');
var router = express.Router();


router.get('/', function(req, res, next) {
    res.render('index', { title: 'Kiel Services Web Application' });
});
/* GET home page. */
router.get('/login', function(req, res, next) {
    res.render('login', { title: 'Kiel Services Web Application' });
});
router.get('/forgotpassword', function(req, res, next) {
    res.render('forgotpassword', { title: 'Kiel Services Web Application' });
});

module.exports = router;

