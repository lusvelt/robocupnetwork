const Sequelize = require('sequelize');

const sequelize = require('../../config/sequelize');

const TeamIsInPhase = sequelize.define('TeamIsInPhase', {
    teamId: { type: Sequelize.INTEGER, primaryKey: true, allowNull: false },
    phaseId: { type: Sequelize.INTEGER, primaryKey: true, allowNull: false },
}, {
    tableName: 'TeamIsInPhase'
});

module.exports = TeamIsInPhase;
