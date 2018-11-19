const Sequelize = require('sequelize');

const sequelize = require('../../config/sequelize');

const RoleCanDoAction = sequelize.define('RoleCanDoAction', {});

module.exports = RoleCanDoAction;
