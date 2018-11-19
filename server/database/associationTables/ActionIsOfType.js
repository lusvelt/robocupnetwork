const Sequelize = require('sequelize');

const sequelize = require('../../config/sequelize');

const ActionIsOfType = sequelize.define('ActionIsOfType', {});

module.exports = ActionIsOfType;
