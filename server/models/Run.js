const Sequelize = require('sequelize');
const sequelize = require('../config/sequelize');

const Run = sequelize.define('Run', {
    start: { type: Sequelize.DATE, allowNull: false },
    end: { type: Sequelize.DATE, allowNull: false },
    status: { type: Sequelize.ENUM('validated', 'toBeValidated', 'toBeCanceled', 'toBeReviewed'), allowNull: false },
    contestationMessage: { type: Sequelize.TEXT }
});

module.exports = Run;
