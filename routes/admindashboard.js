var express = require('express');
var db = require("./db");
var router = express.Router();

var checkSession = function (req, res) {
    var result = true;
    sess = req.session;
    if (sess === undefined || !sess.username) {
        result = false;
        res.redirect('/login');
    }

    return result;
}

router.get('/', function (req, res, next) {
    if (!checkSession(req, res))
        return;

    db.query("select * from  userview", function (err, rows) {
        res.render('adminDashboard',
            {
                title: 'Kiel Services Web Application',
                result: rows,
                partials: {
                    headPartial: 'headPartial',
                    navBarPartial: 'navBarPartial'
                }
            });
    });
});

/* get contacts of user */
router.get('/getContacts',
    function (req, res, next) {
        if (!checkSession(req, res))
            return;

        var reviews;
        db.query(
            'SELECT * FROM contact',
            function (err, result) {
                if (err)
                    throw err;

                res.send(result);
                console.log('The solution is: ', result);
            });
    });

/* edit review */
router.post('/editContact',
    function (req, res, next) {
        if (!checkSession(req, res))
            return;

        var reqBody = req.body;
        var queryString;
        if (reqBody.oper == 'del') {
            queryString =
                "delete from contact where id = {0}"
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

/* get reviews of user */
router.get('/getReviews',
    function (req, res, next) {
        if (!checkSession(req, res))
            return;

        var reviews;
        db.query(
            'SELECT ur.id, p.name, p.address, ur.description, ur.viewdate, ur.confirm FROM userview ur INNER JOIN places p on ur.placeid = p.id',
            function (err, result) {
                if (err)
                    throw err;

                res.send(result);
                console.log('The solution is: ', result);
            });
    });

/* edit review */
router.post('/editReview',
    function (req, res, next) {
        if (!checkSession(req, res))
            return;

        var reqBody = req.body;
        var queryString;
        if (reqBody.oper == 'edit') {
            queryString =
                "update userview set description = '{0}' where id = {1}"
                    .format(reqBody.description, reqBody.id);
        }
        else if (reqBody.oper == 'del') {
            queryString =
                "delete from userview where id = {0}"
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

module.exports = router;

