
var express = require('express');
var router = express.Router();

/* GET ShowNearPlace page. */
var db = require('./db');


var qres_row = {};
var views = '';


var sess;

router.get('/:subject', function (req, res) {
    sess = req.session;
    // console.log(sess.username);
    if (sess.username) {
        res.render('ShowNearPlace', { subject: req.params.subject });
    }
    else
        res.redirect('/login');
});

router.post('/Userview', function (req, res, next) {

    var palceid = req.body.placeid;
    var query = "SELECT * FROM userview where placeid = '" + palceid.toString() + "' and confirm='1'";

    db.query(query, function (err, result) {

        if (err) throw err;
        //console.log('The solution : ', result);

        if (result.length > 0) {
            // views = result;
            views = '<table cellspacing="0" id="places" width="100%">';
            views += '<tr><th  width="5%">username</th><th  width="80%">Review</th><th  width="5%">Review Date </th></tr>';
            for (var i = 0; i < result.length; i++) {
                views += '<tr><td>' + result[i].username + '</td><td>' + result[i].description + '</td><td>' + result[i].viewdate + '</td></tr>';
            }

            views += '</table>';
        }
        else
            views = '';
        res.send(views);
    });

    // res.render('ShowNearPlace', {Reviews:views,subject: req.params.subject});

});

router.post('/Addfavorite', function (req, res, next) {

    var googlePlaceid = req.body.placeid;

    var insertFav = function (placeid) {
        var usern = sess.username;
        var queryString = "insert into UserFavorites(username,Placeid) values('" + usern + "','" + placeid + "')";
        db.query(queryString, function (error, results) {
            if (error)
                throw error;
        });
    }

    var query = "SELECT * FROM places where placeid = '" + googlePlaceid.toString() + "'";
    db.query(query, function (err, results) {
        if (err) throw err;
        if (results.length == 0) {
            var queryString2 = "insert into places(Placeid,name,address,tel,openhour) values('" + googlePlaceid + "','" + req.body.name + "','" + req.body.address + "','" + req.body.tel + "','" + req.body.openhour + "')";
            db.query(queryString2, function (error, results) {
                if (error)
                    throw error;

                var placeid = results[0].id;
                insertFav(placeid);
            });
        }
        {
            var placeid = results[0].id;
            insertFav(placeid);
        }
    });

})

router.post('/AddReview', function (req, res, next) {
    var PId = req.body.PId;
    var ReviewTextarea = req.body.ReviewTextarea;
    var uname = sess.username;
    var date = new Date().toLocaleDateString();

    var queryString = "insert into userview(username,Placeid,description,viewdate) values('" + uname + "','" + PId + "','" + ReviewTextarea + "','" + date + "')";
    // console.log('date:'+date);
    db.query(queryString, function (error, results) {
        if (error) {
            throw error;
        }
        else {

            var query = "SELECT * FROM places where placeid = '" + PId.toString() + "'";

            db.query(query, function (err, result) {
                if (err) throw err;
                if (result.length == 0) {
                    var queryString2 = "insert into places(Placeid,name,address,tel,openhour) values('" + PId + "','" + req.body.name + "','" + req.body.address + "','" + req.body.tel + "','" + req.body.openhour + "')";
                    db.query(queryString2, function (error, results) {
                        if (error) {
                            throw error;
                        }
                        // console.log('queryString2:' + queryString2);
                    });

                }
                res.end('success');
            });
        }


    });

});
module.exports = router;