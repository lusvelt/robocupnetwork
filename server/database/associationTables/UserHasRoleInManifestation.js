const Sequelize = require('sequelize');

const sequelize = require('../../config/sequelize');

const UserHasRoleInManifestation = sequelize.define('UserHasRoleInManifestation', {
    manifestationId: { type: Sequelize.INTEGER, primaryKey: true, allowNull: false },
    userId: { type: Sequelize.INTEGER, primaryKey: true, allowNull: false },
    roleId: { type: Sequelize.INTEGER, primaryKey: true, allowNull: false }
}, {
    tableName: 'UserHasRoleInManifestation'
});

UserHasRoleInManifestation.getRolesInManifestationFromId = (_id, _manifestationId) => UserHasRoleInManifestation.findAll({
    attributes: { exclude: ['createdAt', 'updatedAt'] },
    where: {
        userId: _id,
        manifestationId: _manifestationId
    }
});

module.exports = UserHasRoleInManifestation;
