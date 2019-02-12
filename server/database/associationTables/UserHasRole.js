const Sequelize = require('sequelize');

const sequelize = require('../../config/sequelize');

const UserHasRole = sequelize.define('UserHasRole', {
    userId: { type: Sequelize.INTEGER, primaryKey: true, allowNull: false },
    roleId: { type: Sequelize.INTEGER, primaryKey: true, allowNull: false }
}, {
    tableName: 'UserHasRole'
});

UserHasRole.getRolesFromId = (_id) => UserHasRole.findAll({
    attributes: { exclude: ['createdAt', 'updatedAt'] },
    where: {
        userId: _id
    }
});


module.exports = UserHasRole;
