const eventEmitter = require('./eventEmitter');

const internalEventsSystem = (req, res, next) => {
    res.on('finish', () => eventEmitter.emit(req.url.substr(1)));
    next();
};

module.exports = internalEventsSystem;