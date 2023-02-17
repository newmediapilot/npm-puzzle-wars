import io from 'socket.io-client';

const socket = io('ws://localhost:3000', {transports: ['polling']});

const cursorEl = document.querySelector('.cursor').cloneNode();
const containerEl = document.querySelector('.container');

socket.on('message', (data) => {
    containerEl.innerHTML = '';
    console.log('data', data);
    Object.keys(data).forEach((id, index) => {
        if (id) {
            const cursorClone = cursorEl.cloneNode();

            containerEl.appendChild(cursorClone);

            cursorClone.style.left = `${data[id][1]}px`;
            cursorClone.style.top = `${data[id][2]}px`;
            cursorClone.style.backgroundColor = data[id][3] ? 'green' : 'blue';
        }

    });
});

let isMouseDown = false;

window.addEventListener('mousedown', () => {
    isMouseDown = true;
});

window.addEventListener('mouseup', () => {
    isMouseDown = false;
});

window.addEventListener('mousemove', (event) => {
    const x = event.clientX - document.documentElement.offsetLeft;
    const y = event.clientY - document.documentElement.offsetTop;
    socket.emit('message', [socket.id, x, y, isMouseDown]);
});