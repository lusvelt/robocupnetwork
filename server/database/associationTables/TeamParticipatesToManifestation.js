const Sequelize = require('sequelize');

const sequelize = require('../../config/sequelize');

const TeamParticipatesToManifestation = sequelize.define('TeamParticipatesToManifestation', {}, {
    tableName: 'TeamParticipatesToManifestation'
});

module.exports = TeamParticipatesToManifestation;
