const Sequelize = require('sequelize');
const sequelize = require('../config/sequelize');

const Action = sequelize.define('Action', {
    name: { type: Sequelize.STRING, allowNull: false },
    description: { type: Sequelize.TEXT, allowNull: false }
});

Action.getActionsList = () => Action.findAll({ attributes: { exclude: ['createdAt', 'updatedAt'] } });

module.exports = Action;
