const Sequelize = require('sequelize');
const {limitRun} = require('../config/values');
const sequelize = require('../config/sequelize');
const Team = require('./Team');
const School = require('./School');
const AgeRange = require('./AgeRange');
const Field = require('./Field');

const Run = sequelize.define('Run', {
    start: { type: Sequelize.DATE, allowNull: false },
    end: { type: Sequelize.DATE },
    status: { type: Sequelize.ENUM('validated', 'deleted' ,'toBeValidated', 'toBeCanceled', 'toBeReviewed', 'running', 'excluded'), allowNull: false, defaultValue: 'running' },
    contestationMessage: { type: Sequelize.TEXT },
    aliveVictims: { type: Sequelize.INTEGER },
    deadVictims: { type: Sequelize.INTEGER },
    evacuationType: { type: Sequelize.ENUM('high', 'low') },
    lastCheckpointIsRoom: { type: Sequelize.BOOLEAN },
    zones: { type: Sequelize.JSON },
    maxTime: { type: Sequelize.INTEGER },
    numberOfCheckpoints: { type: Sequelize.INTEGER },
    events: { type: Sequelize.JSON},
    score: {type: Sequelize.INTEGER, defaultValue: 0 },
    remainingTime: {type: Sequelize.INTEGER, defaultValue: 0},
    sign: { type: Sequelize.TEXT }
});

Run.getRunsList = () => Run.findAll({order: [['start','DESC']],attributes: { exclude: ['createdAt', 'updatedAt','sign'] },
    include: [Field, {model: Team,  attributes: { exclude: ['createdAt', 'updatedAt']}, include: [AgeRange, School]}] });

Run.getRunInfo = (id) => Run.findById(id, { attributes: { exclude: ['createdAt', 'updatedAt'] },
    include: [Field, {model: Team,  attributes: { exclude: ['createdAt', 'updatedAt']}, include: [AgeRange, School]}] });

Run.getLimitatedList = () => Run.findAll({order: [['start','DESC']], limit: limitRun, attributes: { exclude: ['createdAt', 'updatedAt','sign'] },
    include: [Field, {model: Team,  attributes: { exclude: ['createdAt', 'updatedAt']}, include: [AgeRange, School]}]});  

module.exports = Run;
