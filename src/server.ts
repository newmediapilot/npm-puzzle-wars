import {Board} from './server/board';

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

const board = new Board();

io.on('connection', (socket) => {

    board.setEvent([socket.id, 0, 0, false]);

    socket.on('message', (data) => {
        board.setEvent(data);
    });

    socket.on('disconnect', () => {
        board.clearEvent(socket.id);
    });

    setInterval(() => {
        io.emit('message', board.getEvents());
    }, 1000/60);
});

server.listen(3000, () => {
    console.log('Server started on port 3000');
});
