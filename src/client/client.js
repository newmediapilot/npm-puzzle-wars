import io from 'socket.io-client';

const socket = io('ws://localhost:3000', {transports: ['polling']});

const cursor = document.querySelector('.cursor');

socket.on('message', (data) => {
    if (socket.id === data[0]) {
        cursor.style.left = `${data[1]}px`;
        cursor.style.top = `${data[2]}px`;
    }
});

window.addEventListener('mousemove', (event) => {
    const x = event.clientX - document.documentElement.offsetLeft;
    const y = event.clientY - document.documentElement.offsetTop;
    socket.emit('message', [socket.id, x, y]);
});