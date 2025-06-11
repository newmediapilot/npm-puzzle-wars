# Puzzle Wars

This is a game where users assemble a puzzle in a competitive style.
The person to get the most pieces on the board wins - 
the other person can use power-ups to distract the opponent.

# Server design

1. User logs into a session ex. localhost/8fh3jdks
1. Session begins by registering the user with a hash
1. User emits the following events to server:

# Events

- user:connect 
- user:register
- user:piece:startdrag
- user:piece:stopdrag
- server:update-pieces