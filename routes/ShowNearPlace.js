
var express = require('express');
var router = express.Router();

/* GET ShowNearPlace page. */
var db = require('./db');


var qres_row = {};
var views ='';


var sess;

router.get('/:subject', function(req, res) {
    sess = req.session;
   // console.log(sess.username);
    if(sess.username) {
        res.render('ShowNearPlace', {subject: req.params.subject});
     }
    else
       res.redirect('/login');
});

router.post('/Userview/:PlaceId', function(req, res, next) {

    var palceid = req.params.PlaceId;
   var query = "SELECT * FROM userview where placeid = '" + palceid.toString()+"'";

   db.query(query, function(err, result) {

        if (err) throw err;
          //console.log('The solution : ', result);

        if (result.length>0 )
        {
            // views = result;
            views = '<table cellspacing="0" id="places" width="100%">';
            views +='<tr><th  width="5%">username</th><th  width="80%">Review</th><th  width="5%">Review Date </th></tr>';
            for (var i=0;i< result.length;i++)
            {
                views +='<tr><td>'+result[i].username+'</td><td>'+result[i].description+'</td><td>'+result[i].viewdate+'</td></tr>';
            }

            views +='</table>';
        }
        else
          views ='';
       res.send(views);
    });

    // res.render('ShowNearPlace', {Reviews:views,subject: req.params.subject});

});

router.post('/Addfavorite/:PlaceId', function(req, res, next) {

    var palceid = req.params.PlaceId;
    var usern= sess.username;
    var queryString = "insert into UserFavorites(username,Placeid) values('" +usern+ "','" + palceid + "')";
  //  console.log(queryString);
    db.query(queryString, function (error, results) {
        if (error) {
            throw error;
        }

    });

})
router.post('/AddReview', function(req, res, next) {
    var PId = req.body.PId;
    var ReviewTextarea = req.body.ReviewTextarea;
    var uname = sess.username;
   var date = new Date().toLocaleDateString();

    var queryString = "insert into userview(username,Placeid,description,viewdate) values('" +uname+ "','" + PId + "','" + ReviewTextarea + "','" + date + "')";
  // console.log('date:'+date);
    db.query(queryString, function (error, results) {
        if (error) {
            throw error;
        }
        else {
            res.end('success');
        }


    });

});
module.exports = router;