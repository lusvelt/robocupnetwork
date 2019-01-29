const Sequelize = require('sequelize');

const sequelize = require('../../config/sequelize');

const SchoolHasSchoolType = sequelize.define('SchoolHasSchoolType', { });

module.exports = SchoolHasSchoolType;
