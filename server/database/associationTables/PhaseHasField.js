const Sequelize = require('sequelize');

const sequelize = require('../../config/sequelize');

const PhaseHasField = sequelize.define('PhaseHasField', {}, {
    tableName: 'PhaseHasField'
});

module.exports = PhaseHasField;
