const Sequelize = require('sequelize');
const sequelize = require('../config/sequelize');

const RobotType = sequelize.define('RobotType', {
    name: { type: Sequelize.STRING, allowNull: false }
});

module.exports = RobotType;
