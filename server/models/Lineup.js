const Sequelize = require('sequelize');
const sequelize = require('../config/sequelize');

const Lineup = sequelize.define('Lineup', {
    name: { type: Sequelize.STRING }
});

module.exports = Lineup;
