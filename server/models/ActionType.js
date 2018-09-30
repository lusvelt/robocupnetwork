const Sequelize = require('sequelize');
const sequelize = require('../config/sequelize');

const ActionType = sequelize.define('ActionType', {
    name: { type: Sequelize.STRING, allowNull: false }
});

module.exports = ActionType;
