
var express = require('express');
var router = express.Router();

/* GET ShowNearPlace page. */
var db = require('./db');
var qres_row = {};
var views ='';



/*router.get('/:subject', function(req, res, next) {

    res.render('ShowNearPlace', { subject: req.params.subject});
});*/



router.get('/:subject', function(req, res) {

       res.render('ShowNearPlace', {subject: req.params.subject});
});

router.post('/Userview/:PlaceId', function(req, res, next) {

    var palceid = req.params.PlaceId;
   var query = "SELECT * FROM userview where placeid = '" + palceid.toString()+"'";

   db.query(query, function(err, result) {

        if (err) throw err;
          console.log('The solution : ', result);

        if (result.length>0 )
        {
            // views = result;
            views = '<table cellspacing="0" id="places" width="90%">';
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
    var usern= 'maryam';
    var queryString = "insert into UserFavorites(username,Placeid) values('" +usern+ "','" + palceid + "')";
    console.log(queryString);
    db.query(queryString, function (error, results) {
        if (error) {
            throw error;
        }

    });

})
router.post('/AddReview', function(req, res, next) {
    var PId = req.body.PId;
    var ReviewTextarea = req.body.ReviewTextarea;
  //  sess = req.session;
  //  sess.username = username;
    console.log("PId: "+ PId);
    console.log("ReviewTextarea value: "+ ReviewTextarea);
    var uname = 'maryam';
    var date = '2016-12-10'

    var queryString = "insert into userview(username,Placeid,description,viewdate) values('" +uname+ "','" + PId + "','" + ReviewTextarea + "','" + date + "')";
    console.log(queryString);
    db.query(queryString, function (error, results) {
        if (error) {
            throw error;
        }
        else {
            res.end('success');
        }
     //   else {
       //     res.render('ShowNearPlace', {subject: req.params.subject});
        //}

    });

});
module.exports = router;