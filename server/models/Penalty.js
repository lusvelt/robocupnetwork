const Sequelize = require('sequelize');
const sequelize = require('../config/sequelize');

const Penalty = sequelize.define('Penalty', {
    fromAttempt: { type: Sequelize.INTEGER, allowNull: false, unique: true },
    toAttempt: { type: Sequelize.INTEGER, allowNull: false, unique: true },
    penaltyPointsPerAttempt: { type: Sequelize.INTEGER, allowNull: false, unique: true }
});

module.exports = Penalty;
