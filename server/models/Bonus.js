const Sequelize = require('sequelize');
const sequelize = require('../config/sequelize');

const Bonus = sequelize.define('Bonus', {
    name: { type: Sequelize.STRING, allowNull: false },
    expression: { type: Sequelize.STRING, allowNull: false }
});

module.exports = Bonus;
