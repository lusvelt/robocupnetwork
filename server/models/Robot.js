const Sequelize = require('sequelize');
const sequelize = require('../config/sequelize');

const Robot = sequelize.define('Robot', {
    name: { type: Sequelize.STRING, allowNull: false }
});

module.exports = Robot;
