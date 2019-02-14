const Sequelize = require('sequelize');
const sequelize = require('../config/sequelize');

const AgeRange = sequelize.define('AgeRange', {
    name: { type: Sequelize.STRING, allowNull: false },
    min: { type: Sequelize.STRING, allowNull: false },
    max: { type: Sequelize.STRING, allowNull: false }
});

AgeRange.getAgeRangesList = () => AgeRange.findAll({ attributes: { exclude: ['createdAt', 'updatedAt'] } });

module.exports = AgeRange;
