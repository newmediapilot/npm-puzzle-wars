import io from 'socket.io-client';

const socket = io('ws://localhost:3000', {transports: ['polling']});

const containerEl = document.querySelector('.board-inner');
const cursorsEl = containerEl.querySelector('.cursors');
const cursorEl = containerEl.querySelector('.cursor');
const piecesEl = containerEl.querySelector('.pieces');
const pieceEl = containerEl.querySelector('.piece');

socket.on('message', (data) => {

    // Render cursors
    cursorsEl.innerHTML = '';
    Object.keys(data).forEach((id, index) => {
        if (id) {
            const cursorClone = cursorEl.cloneNode();

            cursorsEl.appendChild(cursorClone);

            cursorClone.innerHTML = id;
            cursorClone.style.willChange = 'left top';
            cursorClone.style.left = `${data[id][1]}px`;
            cursorClone.style.top = `${data[id][2]}px`;
            cursorClone.style.backgroundColor = data[id][3] ? 'green' : 'blue';
        }
    });

    // Render pieces
    piecesEl.innerHTML = '';
    data.pieces.forEach(piece => {
        const pieceClone = pieceEl.cloneNode();

        piecesEl.appendChild(pieceClone);

        // pieceClone.innerHTML = `${piece.tC} ${piece.lC}`;
        pieceClone.style.willChange = 'top left ';
        pieceClone.style.top = `${piece.tC}px`;
        pieceClone.style.left = `${piece.lC}px`;
        pieceClone.style.width = `${piece.w}px`;
        pieceClone.style.height = `${piece.h}px`;
    });
});

let isMouseDown = false;
let clientX = 0;
let clientY = 0;

const sendEvent = () => {
    socket.emit('message', [socket.id, clientX, clientY, isMouseDown]);
};

window.addEventListener('mousedown', (event) => {
    isMouseDown = true;
    sendEvent();
});

window.addEventListener('mouseup', (event) => {
    isMouseDown = false;
    sendEvent();
});

window.addEventListener('mousemove', (event) => {
    clientX = event.clientX - document.documentElement.offsetLeft;
    clientY = event.clientY - document.documentElement.offsetTop;
    sendEvent();
});

sendEvent();