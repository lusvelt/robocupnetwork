const Sequelize = require('sequelize');
const sequelize = require('../config/sequelize');

const Category = sequelize.define('Category', {
    name: { type: Sequelize.STRING, allowNull: false },
    description: { type: Sequelize.TEXT },
    scoringType: { type: Sequelize.ENUM('events', 'finalJudgement'), allowNull: false },
    runType: { type: Sequelize.ENUM('solo', 'match'), allowNull: false },
    maxRobotsPerTeam: { type: Sequelize.INTEGER, allowNull: false, unique: true },
    maxTeamsPerLineUp: { type: Sequelize.INTEGER, allowNull: false, unique: true },
    isDividedIntoZones: { type: Sequelize.TINYINT, allowNull: false },
    requiresEvacuation: { type: Sequelize.TINYINT, allowNull: false },
    defaultMax: { type: Sequelize.INTEGER, allowNull: false }
});

module.exports = Category;
