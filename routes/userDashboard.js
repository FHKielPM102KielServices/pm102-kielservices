var express = require('express');
var db = require("./db");
var router = express.Router();

var checkSession = function (req, res) {
    var result = true;
    sess = req.session;
    if (req.session === undefined || !sess.username) {
        result = false;
        res.redirect('/login');
    }

    return result;
}

/* users profile info */
router.get('/',
    function (req, res, next) {
        if (!checkSession(req, res))
            return;

        var users;
        //ToDo
        db.query(
            'select * from users limit 1',
            function (err, result) {
                if (err)
                    throw err;

                res.render('userDashboard', {
                    username: result[0].username,
                    name: result[0].name,
                    dateOfBirth: result[0].dateOfBirth,
                    email: result[0].email,
                    partials: {
                        headPartial: 'headPartial',
                        navBarPartial: 'navBarPartial',
                        jqUIHeadPartial: 'jqUIHeadPartial'
                    }
                });
            });
    });

/* update user profile */
router.post('/updateProfile',
    function (req, res, next) {
        if (!checkSession(req, res))
            return;

        var reqBody = req.body;
        var username = reqBody.username;
        var name = reqBody.name;
        var dateOfBirth = reqBody.dateOfBirth;
        var email = reqBody.email;
        var password = reqBody.password;

        var user;
        var queryString = "select * from users where username = '{0}'".format(username);
        db.query(
            queryString,
            function (err, result) {
                if (err)
                    throw err;

                user = result[0];
                if (user.username !== username || user.name !== name || user.dateOfBirth !== dateOfBirth ||
                    user.email !== email || user.password !== password) {
                    updateQueryString =
                        "update users set name = '{0}', dateOfBirth = '{1}', email = '{2}', password = '{3}' where username = '{4}'"
                            .format(name, dateOfBirth, email, password, username);
                    db.query(
                        updateQueryString,
                        function (err, result) {
                            if (err)
                                throw err;
                            else {
                                // res.writeHead(302, {location: '/users'});
                                // res.redirect('/users', 302);
                                res.end('success');
                            }
                        });
                }
            });
    });

/* get reviews of user */
router.get('/getReviews',
    function (req, res, next) {
        if (!checkSession(req, res))
            return;

        var reviews;
        db.query(
            'SELECT ur.id, p.name, p.address, ur.description, ur.viewdate, c.value confirm FROM userview ur INNER JOIN places p on ur.placeid = p.id INNER JOIN constants c on ur.confirm = c.id',
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


/* get userFavorites of user */
router.get('/getFavorites',
    function (req, res, next) {
        if (!checkSession(req, res))
            return;

        db.query(
            'SELECT uf.id, p.name, p.address, uf.username FROM userfavorites uf INNER JOIN places p on uf.placeid = p.id',
            function (err, result) {
                if (err)
                    throw err;

                res.send(result);
                console.log('The solution is: ', result);
            });
    });
/* edit favorite */
router.post('/editFavorite',
    function (req, res, next) {
        if (!checkSession(req, res))
            return;

        var reqBody = req.body;
        var queryString;
        if (reqBody.oper == 'del') {
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