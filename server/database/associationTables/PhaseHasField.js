const Sequelize = require('sequelize');

const sequelize = require('../../config/sequelize');

const PhaseHasField = sequelize.define('PhaseHasField', {});

module.exports = PhaseHasField;
