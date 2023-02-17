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

const events = {}

io.on('connection', (socket) => {

    events[socket.id] = true;

    socket.on('message', (data) => {
        events[data[0]] = data;
    });

    socket.on('disconnect', () => {
        delete events[socket.id];
    });

    setInterval(() => {
        io.emit('message', events);
    }, 1000 / 15);
});

server.listen(3000, () => {
    console.log('Server started on port 3000');
});
