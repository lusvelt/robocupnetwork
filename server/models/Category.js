const Sequelize = require('sequelize');
const sequelize = require('../config/sequelize');

const Category = sequelize.define('Category', {
    name: { type: Sequelize.STRING, allowNull: false },
    description: { type: Sequelize.TEXT },
    scoringType: { type: Sequelize.ENUM('events', 'finalJudgement'), allowNull: false, defaultValue: 'events' },
    runType: { type: Sequelize.ENUM('solo', 'match'), allowNull: false, defaultValue: 'solo' },
    maxRobotsPerTeam: { type: Sequelize.INTEGER.UNSIGNED, allowNull: false, defaultValue: 1 },
    maxTeamsPerLineUp: { type: Sequelize.INTEGER.UNSIGNED, allowNull: false, defaultValue: 1 },
    isDividedIntoZones: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: 0 },
    checkpointsDetermineZones: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: 1 },
    requiresEvacuation: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: 0 },
    defaultMaxTime: { type: Sequelize.INTEGER, allowNull: false }
});

Category.getCategoriesList = () => Category.findAll({ attributes: { exclude: ['createdAt', 'updatedAt'] } });

module.exports = Category;
