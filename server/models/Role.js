const Sequelize = require('sequelize');
const sequelize = require('../config/sequelize');
const Action = require('./Action');

const Role = sequelize.define('Role', {
    name: { type: Sequelize.STRING, allowNull: false, unique: true },
    description: { type: Sequelize.TEXT }
});

Role.getRolesList = () => Role.findAll({
     attributes: { exclude: ['createdAt', 'updatedAt'] },
     include: [ Action ]
});     

module.exports = Role;
