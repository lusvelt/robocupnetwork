const Sequelize = require('sequelize');

const sequelize = require('../../config/sequelize');

const UserHasRole = sequelize.define('UserHasRole', {
    userId: { type: Sequelize.INTEGER, primaryKey: true, allowNull: false },
    roleId: { type: Sequelize.INTEGER, primaryKey: true, allowNull: false }
}, {
    tableName: 'UserHasRole'
});

module.exports = UserHasRole;
