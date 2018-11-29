const eventEmitter = require('./../config/eventEmitter');

const sockets = {
    initialize: (io) => {
        const clientsIo = io.of('/clients');
        const appsIo = io.of('/apps');
        const publicIo = io.of('/public');

        clientsIo.on('connection', (socket) => {
            // Questo va aggiustato, in particolare probabilmente si può semplificare con l'invio broadcast
            eventEmitter.on('userCreated', (user) => socket.emit('newUser', user));
        });
    }
};

module.exports = sockets;