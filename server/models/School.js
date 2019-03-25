const Sequelize = require('sequelize');
const sequelize = require('../config/sequelize');
const Place = require('./Place');

const School = sequelize.define('School', {
    name: { type: Sequelize.STRING, allowNull: false },
});

School.getSchoolsList = () => School.findAll({ 
    attributes: { exclude: ['createdAt', 'updatedAt'] }, 
    include: [ Place ]
});

module.exports = School;
