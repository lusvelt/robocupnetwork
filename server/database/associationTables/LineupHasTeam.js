const Sequelize = require('sequelize');

const sequelize = require('../../config/sequelize');

const LineupHasTeam = sequelize.define('LineupHasTeam', {}, {
    tableName: 'LineupHasTeam'
});

module.exports = LineupHasTeam;
