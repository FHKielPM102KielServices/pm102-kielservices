var express = require('express');
var router = express.Router();
var passport = require('passport');
var nodemailer = require('nodemailer');
var LocalStrategy = require('passport-local').Strategy;
var session = require('express-session');
var connection = require("./db");

router.get('/', function(req, res, next) {
    res.render('index', { title: 'Kiel Services Web Application' });
});
/* GET home page. */
router.get('/login', function(req, res, next) {
    res.render('login', { title: 'Kiel Services Web Application' });
});
router.get('/admindashboard', function(req, res, next) {
    console.log('test');
  /*  connection.query('select * from  review',function(err,rows){
        console.log('test');

        res.render('admindashboard', { title: 'Kiel Services Web Application',result : rows});
    });*/
    //res.render('admindashboard', { title: 'Kiel Services Web Application'});

    connection.query("select * from  review",function(err,rows) {
        res.render('admindashboard', { title: 'Kiel Services Web Application',result:rows});
    });
});
router.get('/forgotpassword', function(req, res, next) {
    res.render('forgotpassword', { title: 'Kiel Services Web Application' });
});
router.post('/loginOld', function(req, res, next) {
    res.render('forgotpassword', { title: 'Kiel Services Web Application' });
});
router.get('/contactUs', function(req, res, next) {
    res.render('contactUs', { title: 'Kiel Services Web Application' });
});
router.use(session({secret:"sdsdsdsds",saveUninitialized:true,resave:true}))
router.get('/', function(req, res, next) {
    res.render('chatbox', { title: 'Express' });
});

//
// router.get('/chat_box', function(req, res, next) {
//     res.render('chat_box', { title: 'Kiel Services Web Application'});
// });
router.use(passport.initialize());
router.use(passport.session());
router.post('/login', function(req, res, next) {
    var username = req.param("username");
    var password = req.param("password");
    sess = req.session;
    sess.username = username;
    console.log("user name value: "+ username);
    console.log("password value: "+ password);
    //1 Connect to DB
    //2 insure user exist
    //3 Redirect if user success
    passport.authenticate('local', function(err, user, info) {
        if (err) return next(err)
        if (!user) {
            return res.redirect('/login')
        }
        req.logIn(user, function(err) {
            if (err) return next(err);
            res.render('indexhome', { title: 'Kiel Services Web Application' });
        });
    })(req, res, next);
});
passport.use(new LocalStrategy(function(username, password, done,req) {
    console.log("Login verification " + username + " "  + password);
    console.log("user name value: "+ username);
    console.log("password value: "+ password);
    connection.query('SELECT * FROM users WHERE username = ? and password = ?', [username, password],function(err,rows){
        if(err) {
            console.log('There is an error');
            throw err;
        }
        if (!rows[0])
        {
            console.log("No User");
            return done(null, false, { message: 'Incorrect username.' });
        }
        else
        {
            console.log("User exist" );
            console.log("User id: " + rows[0].password);
            return done(null, rows[0]);
        }
        console.log('Data received from Db:\n');
        console.log(rows);
    });
}));
router.post('/signup',function(req,res){
    connection.query("select * from  users where email = '"+req.body.email+"'",function(err,rows) {
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
router.post('/forgotpassword',function(req,res){
    connection.query("select * from  users where email = '"+req.body.email+"'",function(err,rows) {
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
passport.serializeUser(function(user, done) {
    done(null, user);
});
passport.deserializeUser(function(id, done) {
    //database.User.findById(id, function(err, user) {
    done(null, null);
    //});
});
router.get('/about', function(req, res, next) {
    res.render('about', { title: 'Kiel Services Web Application' });
});
// Logout endpoint
router.get('/logout', function (req, res) {
    req.session.destroy();
    //res.send("logout success!");
    res.redirect('/');
});

router.get('/chat_box', function(req, res, next) {
    res.render('chat_box', { title: 'Kiel Services Web Application' });
});

//Chat Box
//this line not needed remove it
//var http = require('http');
//var app = express();
//before this inirialise app (var app = express());
//app.set('port', process.env.PORT || 3000);

//this linw is necessary keep as it is
//var httpServer = require('http').createServer(app);
//var server = http.createServer(app);
//u pass server from line 150 to io, and not http variable
//ur original code       var io = require('socket.io')(http);
//wht it shd look like
//var io = require('socket.io')(httpServer);

//remove


//remove
//var io = require('socket.io').listen(server);
//var io = require('socket.io').listen(server);


//for listening u do something like
/*httpServer.listen(app.get('port'), function() {
    console.log('Express server listening on port ' + app.get('port'));
});
console.log('socket Server Running');*/

router.get('/', function(req, res){
    res.sendFile(__dirname +'chat_box');
});

//io serverside code , this is important!!
/*
io.on('connection', function(socket){
    //instead of chatMessage & notifyUser,u can use your own events from index.html
    connections.push(socket);
    console.log('connected: %s sockets connected', connections.length);

    Disconnect
    socket.on('disconnect', function(data){
        connections.splice(connections.indexOf(socket),1);
        console.log('disconnected: %s sockets connected', connections.length);
    });

    socket.on('send message',function(data){
        console.log(data);
        io.sockets.emit('new message',{msg: data});
    })

*/
//});


// router.get('/chat_box', function(req, res, next) {
//     res.render(__dirname +'/chat_box.hjs');
// });


//i dont know if u can also write io.sockets.on!!
// io.sockets.on('connection', function(socket){
//     connections.push(socket);
//     console.log('connected: %s sockets connected', connections.length);
//
//     Disconnect
//     socket.on('disconnect', function(data){
//         connections.splice(connections.indexOf(socket),1);
//         console.log('disconnected: %s sockets connected', connections.length);
//     });
//
//     socket.on('send message',function(data){
//         console.log(data);
//         io.sockets.emit('new message',{msg: data});
//     })
//
// });

//no longer needed
// server.listen(3000, function(){
//     console.log('listening on *:3000');
// });
module.exports = router;