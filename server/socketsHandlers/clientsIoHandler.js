const eventEmitter = require('../config/eventEmitter');
const privilegesIo = require('./clients/privilegesIo');
const usersIo = require('./clients/usersIo');
const manifestationIo = require('./clients/manifestationIo');

const clientsIoHandler = (clientsIo) => (socket) => {
    privilegesIo(clientsIo, socket);
    usersIo(clientsIo, socket);
    manifestationIo(clientsIo,socket);
};

module.exports = clientsIoHandler;
