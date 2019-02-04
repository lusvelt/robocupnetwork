const Sequelize = require('sequelize');

const sequelize = require('../../config/sequelize');

const LineupIsInPhase = sequelize.define('LineupIsInPhase', {}, {
    tableName: 'LineupIsInPhase'
});

module.exports = LineupIsInPhase;
