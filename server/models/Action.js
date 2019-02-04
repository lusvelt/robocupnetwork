const Sequelize = require('sequelize');
const sequelize = require('../config/sequelize');
const ActionType = require('./ActionType');
const Module = require('./Module');

const Action = sequelize.define('Action', {
    name: { type: Sequelize.STRING, allowNull: false },
    alias: { type: Sequelize.STRING, allowNull: false },
    description: { type: Sequelize.TEXT, allowNull: false },
    dependsOnManifestation: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false }
});

Action.getActionsList = () => Action.findAll({
    attributes: { exclude: ['createdAt', 'updatedAt'] },
    include: [ ActionType, Module ]
});

module.exports = Action;
