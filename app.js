var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var userDashboard = require('./routes/userDashboard');
var admindashboard = require('./routes/admindashboard');
var ShowNearPlace = require('./routes/ShowNearPlace');
var SubjectsList = require('./routes/SubjectsList');
var Addreview = require('./routes/Addreview');
//var chat_box = require('./routes/chat_server');

require('./routes/extensions.js');

var app = express();
// app.set('port', process.env.PORT || 3000);

// var httpServer = require('http').createServer(app);
// var io = require('socket.io')(httpServer);
// //var people = {};
// //var usernames = {};
// //connections = [];
// var usernames = {};

// // rooms which are currently available in chat
// var rooms = ['room1','room2','room3'];
// //var people = {};

// io.on('connection', function (socket) {
// // when the client emits 'adduser', this listens and executes
//     socket.on('adduser', function(username){
//         // store the username in the socket session for this client
//         socket.username = username;
//         // store the room name in the socket session for this client
//         socket.room = 'room1';
//         // add the client's username to the global list
//         usernames[username] = username;
//         // send client to room 1
//         socket.join('room1');
//         // echo to client they've connected
//         socket.emit('updatechat', 'KS_SERVER', 'you have connected to Kiel Services Administration');
//         // echo to room 1 that a person has connected to their room
//         socket.broadcast.to('room1').emit('updatechat', 'KS_SERVER', username + ' has connected to this room');
//         socket.emit('updaterooms', rooms, 'room1');
//     });

//     // when the client emits 'sendchat', this listens and executes
//     socket.on('sendchat', function (data) {
//         // we tell the client to execute 'updatechat' with 2 parameters
//         io.sockets.in(socket.room).emit('updatechat', socket.username, data);
//     });


//     // when the user disconnects.. perform this
//     socket.on('disconnect', function(){
//         // remove the username from global usernames list
//         delete usernames[socket.username];
//         // update list of users in chat, client-side
//         io.sockets.emit('updateusers', usernames);
//         // echo globally that this client has left
//         socket.broadcast.emit('updatechat', 'SERVER', socket.username + ' has disconnected');
//         socket.leave(socket.room);
//     });
// });

// httpServer.listen(app.get('port'), function() {
//     console.log('Express server listening on port ' + app.get('port'));
// });
//app.io = require('socket.io')();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hjs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
// app.use('/users', users);
app.use('/userDashboard', userDashboard);
app.use('/admindashboard', admindashboard);
app.use('/ShowNearPlace', ShowNearPlace);
app.use('/SubjectsList', SubjectsList);
app.use('/Addreview', Addreview);
//app.use('/chat_box', chat_box);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

module.exports = app;
