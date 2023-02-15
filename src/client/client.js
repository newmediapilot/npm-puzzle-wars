import io from 'socket.io-client';

const socket = io('ws://localhost:3000', {transports: ['polling']});

const cursor = document.querySelectorAll('.cursor');

socket.on('message', (data) => {
    Object.keys(data).forEach((id, index) => {
        if (!!id) {
            cursor[index].style.left = `${data[id][1]}px`;
            cursor[index].style.top = `${data[id][2]}px`;
        }
    });
});

window.addEventListener('mousemove', (event) => {
    const x = event.clientX - document.documentElement.offsetLeft;
    const y = event.clientY - document.documentElement.offsetTop;
    socket.emit('message', [socket.id, x, y]);
});