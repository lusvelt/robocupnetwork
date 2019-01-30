const Sequelize = require('sequelize');
const sequelize = require('../config/sequelize');

const Module = sequelize.define('Module', {
    name: { type: Sequelize.STRING, allowNull: false },
    alias: { type: Sequelize.STRING, allowNull: false }
});

Module.getModulesList = () => Module.findAll({ attributes: { exclude: ['createdAt', 'updatedAt'] } });

module.exports = Module;
