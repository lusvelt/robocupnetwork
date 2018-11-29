const { EventEmitter } = require('events');
const { maxEventListeners } = require('./values');

const eventEmitter = function () {
    if (arguments.callee._singletonInstance)
        return arguments.callee._singletonInstance;
    arguments.callee._singletonInstance = this;
    EventEmitter.call(this);
};

eventEmitter.prototype.__proto__ = EventEmitter.prototype;

module.exports = new eventEmitter();