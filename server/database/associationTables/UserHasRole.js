const Sequelize = require('sequelize');

const sequelize = require('../../config/sequelize');

const UserHasRole = sequelize.define('UserHasRole', {}, {
    tableName: 'UserHasRole'
});

module.exports = UserHasRole;
