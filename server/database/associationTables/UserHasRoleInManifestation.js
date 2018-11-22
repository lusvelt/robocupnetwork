const Sequelize = require('sequelize');

const sequelize = require('../../config/sequelize');

const UserHasRoleInManifestation = sequelize.define('UserHasRoleInManifestation', {
    /*manifestationId: { type: Sequelize.INTEGER, primaryKey: true, allowNull: false },
    userId: { type: Sequelize.INTEGER, primaryKey: true, allowNull: false },
    roleId: { type: Sequelize.INTEGER, primaryKey: true, allowNull: false }*/
});

module.exports = UserHasRoleInManifestation;
