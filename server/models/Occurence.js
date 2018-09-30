const Sequelize = require('sequelize');
const sequelize = require('../config/sequelize');

const Occurence = sequelize.define('Occurence', {
    time: { type: Sequelize.TIME, allowNull: false },
    points: { type: Sequelize.INTEGER },
    number: { type: Sequelize.INTEGER }
});

module.exports = Occurence;
