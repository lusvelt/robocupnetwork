const jwt = require('jsonwebtoken');

const eventEmitter = require('../config/eventEmitter');
const authIo = require('./clients/authIo');
const privilegesIo = require('./clients/privilegesIo');
const usersIo = require('./clients/usersIo');
const manifestationIo = require('./clients/manifestationIo');
const schoolIo = require('./clients/schoolIo');
const placeIo = require('./clients/placeIo');
const ageRangeIo = require('./clients/ageRangeIo');
const teamIo = require('./clients/teamIo');
const categoryIo = require('./clients/categoryIo');
const phasesIo = require('./clients/phasesIo');
const eventsIo = require('./clients/eventsIo');

const clientsAuthMiddleware = require('../auth/middlewares/clientsAuthMiddleware');

const clientsIoHandler = (clientsIo) => (socket) => {
    socket.use(clientsAuthMiddleware(socket));

    const _user = jwt.decode(socket.handshake.query.token);
    let room = null;

    if (_user.manifestation) {
        room = _user.manifestation.id;
        socket.join(room);
    }

    authIo(clientsIo, socket, room);
    privilegesIo(clientsIo, socket, room);
    usersIo(clientsIo, socket, room);
    manifestationIo(clientsIo, socket, room);
    schoolIo(clientsIo, socket, room);
    placeIo(clientsIo, socket, room);
    ageRangeIo(clientsIo, socket, room);
    teamIo(clientsIo, socket, room);
    categoryIo(clientsIo, socket, room);
    phasesIo(clientsIo, socket, room);
    eventsIo(clientsIo, socket, room);
};

module.exports = clientsIoHandler;
