const Sequelize = require('sequelize');

const sequelize = require('../../config/sequelize');

const ShiftIncludesLineup = sequelize.define('ShiftIncludesLineup', {
    shiftId: { type: Sequelize.INTEGER, primaryKey: true },
    lineupId: { type: Sequelize.INTEGER, primaryKey: true },
    fieldId: { type: Sequelize.INTEGER, primaryKey: true, allowNull: false }
});

module.exports = ShiftIncludesLineup;
