const Sequelize = require('sequelize');

const sequelize = require('../../config/sequelize');

const ShiftIncludesLineup = sequelize.define('ShiftIncludesLineup', {
    shiftId: { type: Sequelize.INTEGER, primaryKey: true, allowNull: false },
    lineupId: { type: Sequelize.INTEGER, primaryKey: true, allowNull: false },
    fieldId: { type: Sequelize.INTEGER, primaryKey: true, allowNull: false }
});

module.exports = ShiftIncludesLineup;
