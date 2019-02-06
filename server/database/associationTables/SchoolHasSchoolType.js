const Sequelize = require('sequelize');

const sequelize = require('../../config/sequelize');

const SchoolHasSchoolType = sequelize.define('SchoolHasSchoolType', {}, {
    tableName: 'SchoolHasSchoolType'
});

module.exports = SchoolHasSchoolType;
