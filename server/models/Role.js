const Sequelize = require('sequelize');
const sequelize = require('../config/sequelize');

const Role = sequelize.define('Role', {
    name: { type: Sequelize.STRING, allowNull: false, unique: true },
    description: { type: Sequelize.TEXT }
});

Role.getRolesList = () => Role.findAll({ attributes: { exclude: ['createdAt', 'updatedAt'] } });

module.exports = Role;
