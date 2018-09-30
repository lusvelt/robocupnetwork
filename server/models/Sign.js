const Sequelize = require('sequelize');
const sequelize = require('../config/sequelize');

const Sign = sequelize.define('Sign', {
    sign: { type: Sequelize.TEXT, allowNull: false }
});

module.exports = Sign;
