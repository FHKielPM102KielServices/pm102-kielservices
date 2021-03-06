var express = require('express');
var router = express.Router();
var passport = require('passport');
var nodemailer = require('nodemailer');
var LocalStrategy = require('passport-local').Strategy;
var cookieParser = require('cookie-parser');
var session = require('express-session');
var connection = require("./db");
router.get('/', function (req, res, next) {
    renderIndex(req, res, next);
});
var renderIndex = function (req, res, next) {
    var loginDisplay = "";
    var logoutDisplay = "";
    var adminDashboardDisplay = "";
    var hideStyle = "display:none;";
    var sess = req.session;
    if (sess !== undefined && sess.username) {
        loginDisplay = hideStyle;
        if (sess.username !== "admin")
            adminDashboardDisplay = hideStyle;
    }
    else {
        logoutDisplay = hideStyle;
        adminDashboardDisplay = hideStyle;
    }
    res.render('index', {
        title: 'Kiel Services Web Application',
        loginDisplay: loginDisplay,
        logoutDisplay: logoutDisplay,
        adminDashboardDisplay: adminDashboardDisplay,
        partials: {
            headPartial: 'headPartial',
            navBarPartial: 'navBarPartial'
        }
    });
}
/* GET home page. */
router.get('/login', function (req, res, next) {
    var loginDisplay = "";
    var logoutDisplay = "";
    var adminDashboardDisplay = "";
    var hideStyle = "display:none;";
    var sess = req.session;
    if (sess !== undefined && sess.username) {
        loginDisplay = hideStyle;
        if (sess.username !== "admin")
            adminDashboardDisplay = hideStyle;
    }
    else {
        logoutDisplay = hideStyle;
        adminDashboardDisplay = hideStyle;
    }

    res.render('login',
        {
            title: 'Kiel Services Web Application',
            loginDisplay: loginDisplay,
            logoutDisplay: logoutDisplay,
            adminDashboardDisplay: adminDashboardDisplay,
            partials: {
                headPartial: 'headPartial',
                navBarPartial: 'navBarPartial'
            }
        });
});
router.get('/forgotpassword', function (req, res, next) {
    var loginDisplay = "";
    var logoutDisplay = "";
    var adminDashboardDisplay = "";
    var hideStyle = "display:none;";
    var sess = req.session;
    if (sess !== undefined && sess.username) {
        loginDisplay = hideStyle;
        if (sess.username !== "admin")
            adminDashboardDisplay = hideStyle;
    }
    else {
        logoutDisplay = hideStyle;
        adminDashboardDisplay = hideStyle;
    }

    res.render('forgotpassword', {
        title: 'Kiel Services Web Application',
        loginDisplay: loginDisplay,
        logoutDisplay: logoutDisplay,
        adminDashboardDisplay: adminDashboardDisplay,
        partials: {
            headPartial: 'headPartial',
            navBarPartial: 'navBarPartial'
        }
    });
});
router.post('/loginOld', function (req, res, next) {
    res.render('forgotpassword', { title: 'Kiel Services Web Application' });
});
router.get('/contactUs', function (req, res, next) {
    var loginDisplay = "";
    var logoutDisplay = "";
    var adminDashboardDisplay = "";
    var hideStyle = "display:none;";
    var sess = req.session;
    if (sess !== undefined && sess.username) {
        loginDisplay = hideStyle;
        if (sess.username !== "admin")
            adminDashboardDisplay = hideStyle;
    }
    else {
        logoutDisplay = hideStyle;
        adminDashboardDisplay = hideStyle;
    }

    res.render('contactUs',
        {
            title: 'Kiel Services Web Application',
            loginDisplay: loginDisplay,
            logoutDisplay: logoutDisplay,
            adminDashboardDisplay: adminDashboardDisplay,
            partials: {
                headPartial: 'headPartial',
                navBarPartial: 'navBarPartial'
            }
        });
});
router.use(cookieParser());
router.use(session({
    secret: "sdsdsdsds",
    saveUninitialized: true,
    resave: false,
    cookie: { secure: false }
}))

router.get('/chat_box', function (req, res, next) {
    res.render('chat_box', { title: 'Kiel Services Web Application' });
});
router.use(passport.initialize());
router.use(passport.session());
router.post('/login', function (req, res, next) {
    var username = req.param("username");
    var password = req.param("password");
    // sess = req.session;
    // sess.username = username;
    console.log("user name value: " + username);
    console.log("password value: " + password);
    //1 Connect to DB
    //2 insure user exist
    //3 Redirect if user success
    passport.authenticate('local', function (err, user, info) {
        if (err) return next(err)
        if (!user) {
            return res.redirect('/login')
        }
        req.logIn(user, function (err) {
            if (err) return next(err);
            req.user = user;
            req.session.username = username;
            res.locals.user = user;
            renderIndex(req, res, next);
        });
    })(req, res, next);
});
passport.use(new LocalStrategy(function (username, password, done, req) {
    console.log("Login verification " + username + " " + password);
    console.log("user name value: " + username);
    console.log("password value: " + password);
    connection.query('SELECT * FROM users WHERE username = ? and password = ?', [username, password], function (err, rows) {
        if (err) {
            console.log('There is an error');
            throw err;
        }
        if (!rows[0]) {
            console.log("No User");
            return done(null, false, { message: 'Incorrect username.' });
        }
        else {
            console.log("User exist");
            console.log("User id: " + rows[0].password);
            return done(null, rows[0]);
        }
        console.log('Data received from Db:\n');
        console.log(rows);
    });
}));
router.post('/signup', function (req, res) {
    connection.query("select * from  users where email = '" + req.body.email + "'", function (err, rows) {
        numRows = rows.length;
        console.log(numRows);
        if (err)
            return done(err);
        if (numRows == '1') {
            res.end('done');
        }
        else {
            var queryString = "insert into users(username,name,dob,email,password) values('" + req.body.username + "','" + req.body.name + "','" + req.body.dob + "','" + req.body.email + "','" + req.body.pass + "')";
            console.log(queryString);
            connection.query(queryString, function (error, results) {
                if (error) {
                    throw error;
                }
                else {
                    res.end('success');
                }
            });
        }
    });
});
router.post('/forgotpassword', function (req, res) {
    connection.query("select * from  users where email = '" + req.body.email + "'", function (err, rows) {
        numRows = rows.length;
        console.log(numRows);
        if (err)
            return done(err);
        if (numRows == '0') {
            res.end('Email Doesnot exist in system');
        }
        else {
            var queryString = "select * from  users where email = '" + req.body.email + "'";
            connection.query(queryString, function (error, results) {
                console.log(results);
                if (error) {
                    throw error;
                }
                else {
                    res.end('success');
                }
            });
            res.end('done');
        }
    });
});
router.post('/contactUs', function (req, res) {
    var queryString = "insert into contact(EMAIL,NAME,MESSAGE) values('" + req.body.EMAIL + "','" + req.body.NAME + "','" + req.body.MESSAGE + "')";
    console.log(queryString);
    connection.query(queryString, function (error, results) {
        if (error) {
            throw error;
        }
        else {
            res.end('success');
        }
    });
});
passport.serializeUser(function (user, done) {
    done(null, user);
});
passport.deserializeUser(function (id, done) {
    //database.User.findById(id, function(err, user) {
    done(null, null);
    //});
});
router.get('/about', function (req, res, next) {
    res.render('about', { title: 'Kiel Services Web Application' });
});
// Logout endpoint
router.get('/logout', function (req, res) {
    req.session.destroy();
    //res.send("logout success!");
    res.redirect('/');
});
router.get('/chat_box', function (req, res, next) {
    res.render('chat_box', { title: 'Kiel Services Web Application' });
});
router.get('/adminLogin', function (req, res, next) {
    res.render('adminLogin', { title: 'Kiel Services Web Application' });
});
router.get('/adminProfile', function (req, res, next) {
    res.render('adminProfile', { title: 'Kiel Services Web Application' });
});

module.exports = router;