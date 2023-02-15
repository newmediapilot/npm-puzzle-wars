var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var port = 3000;
app.use(express.static(__dirname + '/public'));
io.on('connection', function (socket) {
    console.log('a user connected');
    socket.on('disconnect', function () {
        console.log('user disconnected');
    });
    socket.on('chat message', function (message) {
        console.log("message: ".concat(message));
        io.emit('chat message', message);
    });
});
server.listen(port, function () {
    console.log("listening on *:".concat(port));
});
