var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var userDashboard = require('./routes/userDashboard');
var adminDashboard = require('./routes/adminDashboard');
var ShowNearPlace = require('./routes/ShowNearPlace');
var SubjectsList = require('./routes/SubjectsList');
var Addreview = require('./routes/Addreview');

require('./routes/extensions.js');

var app = express();
app.set('port', process.env.PORT || 3000);

var httpServer = require('http').createServer(app);
var io = require('socket.io')(httpServer);
var usernames = {};

// rooms which are currently available in chat
var rooms = ['room1','room2','room3'];

io.on('connection', function (socket) {
// when the client emits 'adduser', this listens and executes
    socket.on('adduser', function(username){
        socket.username = username;
        socket.room = 'room1';
        usernames[username] = username;
        socket.join('room1');
        socket.emit('updatechat', 'KS_SERVER', 'you have connected to Kiel Services Administration');
        socket.broadcast.to('room1').emit('updatechat', 'KS_SERVER', username + ' has connected to this room');
        socket.emit('updaterooms', rooms, 'room1');
    });
    // when the client emits 'sendchat', this listens and executes
    socket.on('sendchat', function (data) {
        io.sockets.in(socket.room).emit('updatechat', socket.username, data);
    });

    // when the user disconnects.. perform this
    socket.on('disconnect', function(){
        delete usernames[socket.username];
        io.sockets.emit('updateusers', usernames);
        socket.broadcast.emit('updatechat', 'SERVER', socket.username + ' has disconnected');
        socket.leave(socket.room);
    });
});

httpServer.listen(app.get('port'), function() {
    console.log('Express server listening on port ' + app.get('port'));
});
//view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hjs');
app.set('partials',
  {
    headPartial: 'headPartial',
    navBarPartial: 'navBarPartial',
    jqUIHeadPartial: 'jqUIHeadPartial'
  }
);

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
app.use('/adminDashboard', adminDashboard);
app.use('/ShowNearPlace', ShowNearPlace);
app.use('/SubjectsList', SubjectsList);
app.use('/Addreview', Addreview);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.get('/logout', function (req, res) {
  req.logout();
  res.redirect('/');
});

module.exports = app;
