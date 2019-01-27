const Sequelize = require('sequelize');
const sequelize = require('../config/sequelize');

const Team = sequelize.define('Team', {
    name: { type: Sequelize.STRING, allowNull: false }
});

Team.getTeamsList = () => Team.findAll({ attributes: { exclude: ['createdAt', 'updatedAt'] } });

module.exports = Team;
