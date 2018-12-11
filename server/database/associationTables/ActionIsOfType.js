const Sequelize = require('sequelize');

const sequelize = require('../../config/sequelize');

const ActionIsOfType = sequelize.define('ActionIsOfType', {}, {
    tableName: 'ActionIsOfType'
});

module.exports = ActionIsOfType;
