const eventEmitter = require('../config/eventEmitter');
const privilegesIo = require('./clients/privilegesIo');

const clientsIoHandler = (clientsIo) => (socket) => {
    privilegesIo(clientsIo, socket);
};

module.exports = clientsIoHandler;