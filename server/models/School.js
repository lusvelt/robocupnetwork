const Sequelize = require('sequelize');
const sequelize = require('../config/sequelize');

const School = sequelize.define('School', {
    name: {type: Sequelize.STRING, allowNull: false }
});

module.exports = School;
