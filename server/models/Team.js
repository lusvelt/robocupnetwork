const Sequelize = require('sequelize');
const sequelize = require('../config/sequelize');

const Team = sequelize.define('Team', {
    name: { type: Sequelize.STRING, allowNull: false }
});

module.exports = Team;
