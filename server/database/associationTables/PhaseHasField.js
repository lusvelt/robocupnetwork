const Sequelize = require('sequelize');

const sequelize = require('../../config/sequelize');

const PhaseHasField = sequelize.define('PhaseHasField', {
    phaseId: { type: Sequelize.INTEGER, primaryKey: true, allowNull: false },
    fieldId: { type: Sequelize.INTEGER, primaryKey: true, allowNull: false },
}, {
    tableName: 'PhaseHasField'
});

module.exports = PhaseHasField;
