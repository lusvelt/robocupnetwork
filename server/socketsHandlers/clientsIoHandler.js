const eventEmitter = require('../config/eventEmitter');

const clientsIoHandler = (clientsIo) => (socket) => {
    socket.on('createUser', user => {
        clientsIo.emit('newUser', user);
    });
};

module.exports = clientsIoHandler;