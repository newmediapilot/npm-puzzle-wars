const http = require('http');
const socketIo = require('socket.io');

const server = http.createServer();
const io = socketIo(server, {
    cors: {
        origin: "http://localhost:1234",
        methods: ["GET", "POST"],
        allowedHeaders: ["*"],
        credentials: true
    }
});

io.on('connection', (socket) => {
    console.log('New user connected');

    socket.on('message', (data) => {
        io.emit('message', data);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

server.listen(3000, () => {
    console.log('Server started on port 3000');
});
