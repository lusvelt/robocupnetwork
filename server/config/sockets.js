const clientsIoHandler = require('../socketsHandlers/clientsIoHandler');
const publicIoHandler = require('./../socketsHandlers/publicIoHandler');

const sockets = {
    initialize: (io, authStrategy) => {
        const clientsIo = io.of('/clients').use(authStrategy);
        const publicIo = io.of('/public');

        clientsIo.on('connection', clientsIoHandler(clientsIo));
        publicIo.on('connection', publicIoHandler(publicIo));
    }
};

module.exports = sockets;