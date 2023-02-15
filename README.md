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