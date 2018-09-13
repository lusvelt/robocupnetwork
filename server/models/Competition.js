const Sequelize = require('sequelize');
const sequelize = require('../config/sequelize');

const Competition = sequelize.define('Competition', {
    name: { type: Sequelize.STRING, allowNull: false },
    description: { type: Sequelize.TEXT },
    start: { type: Sequelize.DATE, allowNull: false},
    end: { type: Sequelize.DATE, allowNull: false}
});

module.exports = Competition;
