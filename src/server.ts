import {App} from './server/app';

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

const board = new App();

io.on('connection', (socket) => {

    board.createBoard({
        a: 5,
        d: 5,
        w: 50,
        h: 50,
    });

    socket.on('message', (data) => {
        board.setEvent(data);
    });

    socket.on('disconnect', () => {
        board.clearEvent(socket.id);
    });

    setInterval(() => {
        io.emit('message', board.getEvents());
    }, 1000/30);
});

server.listen(3000, () => {
    console.log('Server started on port 3000');
});
