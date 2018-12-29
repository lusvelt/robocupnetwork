const Sequelize = require('sequelize');
const sequelize = require('../config/sequelize');

const ActionType = sequelize.define('ActionType', {
    name: { type: Sequelize.STRING, allowNull: false }
});

ActionType.getActionTypesList = () => ActionType.findAll({ attributes: { exclude: ['createdAt', 'updatedAt'] } });

module.exports = ActionType;
