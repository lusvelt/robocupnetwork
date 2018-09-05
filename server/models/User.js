const Sequelize = require('sequelize');
const sequelize = require('../config/sequelize');

const User = sequelize.define('User', {
    name: Sequelize.STRING,
    surname: Sequelize.STRING,
    birthDate: Sequelize.DATE,
    email: Sequelize.STRING,
    password: Sequelize.STRING
});

module.exports = User;