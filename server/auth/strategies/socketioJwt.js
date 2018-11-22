const socketioJwt = require('socketio-jwt');

const socketioJwtStrategy = socketioJwt.authorize({
    secret: process.env.JWT_SECRET,
    handshake: true
});

module.exports = socketioJwtStrategy;