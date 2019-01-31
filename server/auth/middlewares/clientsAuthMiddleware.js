const jwt = require('jsonwebtoken');

const clientsAuthMiddleware = (socket) => (packet, next) => {
    const token = jwt.verify(socket.handshake.query.token, process.env.JWT_SECRET);
    
    const eventName = packet[0];
    if (token.actions && token.actions.map(action => action.alias).includes(eventName) || token.isAdmin)
        next();
    else next(new Error());
};

module.exports = clientsAuthMiddleware;