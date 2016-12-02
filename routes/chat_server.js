var express = require('express');
var app = express();
var Server = require('http').createServer(app);
var io = require('socket.io').listen(Server);
users = [];
connections = [];

console.log('Server Running');

app.get('/', function(req, res){
    res.sendFile(__dirname +'/chat_box.hjs');
});

io.sockets.on('connection', function(socket){
    connections.push(socket);
    console.log('connected: %s sockets connected', connections.length);

    // Disconnect
    socket.on('disconnect', function(data){
        connections.splice(connections.indexOf(socket),1);
        console.log('disconnected: %s sockets connected', connections.length);
    });

    socket.on('send message',function(data){
        console.log(data);
        io.sockets.emit('new message',{msg: data});
    })

});

Server.listen(3000, function(){
    console.log('listening on *:3000');
});