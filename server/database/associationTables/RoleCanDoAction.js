const Sequelize = require('sequelize');

const sequelize = require('../../config/sequelize');

const RoleCanDoAction = sequelize.define('RoleCanDoAction', {}, {
    tableName: 'RoleCanDoAction'
});

module.exports = RoleCanDoAction;
