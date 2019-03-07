const Sequelize = require('sequelize');
const sequelize = require('../../config/sequelize');

const TeamHasUser = sequelize.define('TeamHasUser', {
    teamId: { type: Sequelize.INTEGER, primaryKey: true, allowNull: false },
    userId: { type: Sequelize.INTEGER, primaryKey: true, allowNull: false },
    role: { type: Sequelize.ENUM('captain', 'member'), allowNull: false }
    // manifestationId: { type: Sequelize.INTEGER, primaryKey: true, allowNull: false }
}, {
    tableName: 'TeamHasUser'
});

module.exports = TeamHasUser;
