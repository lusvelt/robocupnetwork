const Sequelize = require('sequelize');
const sequelize = require('../config/sequelize');
const AgeRange = require('./AgeRange');
const School = require('./School');

const Team = sequelize.define('Team', {
    name: { type: Sequelize.STRING, allowNull: false }
});

Team.getTeamsList = () => Team.findAll({ attributes: { exclude: ['createdAt', 'updatedAt'] }, include: [ AgeRange, School ] });

module.exports = Team;
