const Sequelize = require('sequelize');
const sequelize = require('../config/sequelize');

const Event = sequelize.define('Event', {
    name: { type: Sequelize.STRING, allowNull: false },
    description: { type: Sequelize.STRING },
    pointsJSCalculator: { type: Sequelize.TEXT, allowNull: false },
    affectsZone: { type: Sequelize.STRING, allowNull: false, defaultValue: 0 },
    affectsAttempt: { type: Sequelize.TEXT, allowNull: false, defaultValue: 0 },
    manuallyTriggerable: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: 1 },
    needsStartCountForZones: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: 0 },
    triggerOnStart: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: 0 },
    waitLastIterationToTrigger: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: 0 },
    cancelPendingEvents: { type: Sequelize.BOOLEAN, defaultValue: 0 }
});

module.exports = Event;
