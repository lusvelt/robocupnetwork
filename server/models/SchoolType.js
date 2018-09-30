const Sequelize = require('sequelize');
const sequelize = require('../config/sequelize');

const SchoolType = sequelize.define('SchoolType', {
    name: { type: Sequelize.STRING, allowNull: false }
});

module.exports = SchoolType;
