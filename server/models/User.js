const Sequelize = require('sequelize');
const sequelize = require('../config/sequelize');

const User = sequelize.define('User', {
    name: { type: Sequelize.STRING, allowNull: false },
    surname: { type: Sequelize.STRING, allowNull: false },
    birthDate: { type: Sequelize.DATE, allowNull: false },
    email: { type: Sequelize.STRING, allowNull: false },
    password: { type: Sequelize.STRING, allowNull: false }
});

module.exports = User;
