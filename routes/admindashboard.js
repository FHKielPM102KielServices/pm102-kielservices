var express = require('express');
var db = require("./db");
var router = express.Router();

/* get reviews of user */
router.get('/getReviews',
    function (req, res, next) {
        var reviews;
        db.query(
            'select * from review',
            function (err, result) {
                if (err)
                    throw err;

                reviews = result;
                res.send(reviews);
                console.log('The solution is: ', result);
            });
    });

/* edit review */
router.post('/editReview',
    function (req, res, next) {
        var reqBody = req.body;
        var queryString;
        if (reqBody.oper == 'edit') {
            queryString =
                "update review set description = '{0}' where id = {1}"
                    .format(reqBody.description, reqBody.id);
        }
        else if (reqBody.oper == 'del') {
            queryString =
                "delete from review where id = {0}"
                    .format(reqBody.id);
        }

        if (queryString === undefined)
            return;

        console.log(queryString);
        db.query(queryString, function (error, result) {
            if (error)
                throw error;
            else
                res.end('success');
        });
    });

