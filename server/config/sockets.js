const eventEmitter = require('./../config/eventEmitter');
const clientsIoHandler = require('../socketsHandlers/clientsIoHandler');
const appsIoHandler = require('./../socketsHandlers/appsIoHandler');
const publicIoHandler = require('./../socketsHandlers/publicIoHandler');

const sockets = {
    initialize: (io) => {
        const clientsIo = io.of('/clients');
        const appsIo = io.of('/apps');
        const publicIo = io.of('/public');

        clientsIo.on('connection', clientsIoHandler(clientsIo));
        appsIo.on('connection', appsIoHandler(appsIo));
        publicIo.on('connection', publicIoHandler(publicIo));
    }
};

module.exports = sockets;