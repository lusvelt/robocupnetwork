const Sequelize = require('sequelize');
const sequelize = require('../config/sequelize');

const Field = sequelize.define('Field', {
    number: { type: Sequelize.INTEGER.UNSIGNED, allowNull: false },
    // maxScore: { type: Sequelize.INTEGER.UNSIGNED },
    // maxTime: { type: Sequelize.TIME },
    // maxCheckpoint: { type: Sequelize.INTEGER.UNSIGNED }
    score: { type: Sequelize.INTEGER },
    status: { type: Sequelize.ENUM('running', 'free'), allowNull: false, defaultValue: 'free' },
    team: { type: Sequelize.STRING }

});

module.exports = Field;
