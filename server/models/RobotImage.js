const Sequelize = require('sequelize');
const sequeize = require('../config/sequelize');

const RobotImage = sequeize.define('RobotImage', {
    image: { type: Sequelize.TEXT, allowNull: false }
});

module.exports = RobotImage;
