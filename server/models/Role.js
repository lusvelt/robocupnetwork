const Sequelize = require('sequelize');
const sequelize = require('../config/sequelize');
const Action = require('./Action');

const Role = sequelize.define('Role', {
    name: { type: Sequelize.STRING, allowNull: false, unique: true },
    description: { type: Sequelize.TEXT },
    alias: { type: Sequelize.STRING, allowNull: false, unique: true },
    dependsOnManifestation: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false }
});

Role.getRolesList = () => Role.findAll({
    attributes: { exclude: ['createdAt', 'updatedAt'] },
    include: [ Action ]
});

module.exports = Role;
