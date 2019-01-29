const Sequelize = require('sequelize');
const sequelize = require('../config/sequelize');

const School = sequelize.define('School', {
    name: { type: Sequelize.STRING, allowNull: false },
});

School.getSchoolsList = () => School.findAll({ attributes: { exclude: ['createdAt', 'updatedAt'] } });

module.exports = School;
