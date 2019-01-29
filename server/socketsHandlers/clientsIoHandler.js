const eventEmitter = require('../config/eventEmitter');
const privilegesIo = require('./clients/privilegesIo');
const usersIo = require('./clients/usersIo');
const manifestationIo = require('./clients/manifestationIo');
const schoolIo = require('./clients/schoolIo');
const placeIo = require('./clients/placeIo');
const ageRangeIo = require('./clients/ageRangeIo');
const teamIo = require('./clients/teamIo');
const categoryIo = require('./clients/categoryIo');


const clientsIoHandler = (clientsIo) => (socket) => {
    privilegesIo(clientsIo, socket);
    usersIo(clientsIo, socket);
    manifestationIo(clientsIo,socket);
    schoolIo(clientsIo, socket);
    placeIo(clientsIo, socket);
    ageRangeIo(clientsIo, socket);
    teamIo(clientsIo, socket);
    categoryIo(clientsIo, socket);
};

module.exports = clientsIoHandler;
