const Sequelize = require('sequelize');
const sequelize = require('../config/sequelize');
const Team = require('./Team');
const School = require('./School');
const AgeRange = require('./AgeRange');
const Field = require('./Field');

const Run = sequelize.define('Run', {
    start: { type: Sequelize.DATE, allowNull: false },
    end: { type: Sequelize.DATE },
    status: { type: Sequelize.ENUM('validated', 'deleted' ,'toBeValidated', 'toBeCanceled', 'toBeReviewed', 'running'), allowNull: false, defaultValue: 'running' },
    contestationMessage: { type: Sequelize.TEXT },
    aliveVictims: { type: Sequelize.INTEGER },
    deadVictims: { type: Sequelize.INTEGER },
    evacuationType: { type: Sequelize.ENUM('high', 'low') },
    lastCheckpointIsRoom: { type: Sequelize.BOOLEAN },
    zones: { type: Sequelize.JSON },
    maxTime: { type: Sequelize.INTEGER },
    numberOfCheckpoints: { type: Sequelize.INTEGER },
    events: { type: Sequelize.JSON},
    score: {type: Sequelize.INTEGER },
    remainingTime: {type: Sequelize.INTEGER, defaultValue: 0}
});

Run.getRunsList = () => Run.findAll({ attributes: { exclude: ['createdAt', 'updatedAt'] },
    include: [Field, {model: Team,  attributes: { exclude: ['createdAt', 'updatedAt']}, include: [AgeRange, School]}] });

Run.getRunInfo = (id) => Run.findById(id, { attributes: { exclude: ['createdAt', 'updatedAt'] },
    include: [Field, {model: Team,  attributes: { exclude: ['createdAt', 'updatedAt']}, include: [AgeRange, School]}] });                        

module.exports = Run;
