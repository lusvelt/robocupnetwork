const Sequelize = require('sequelize');
const sequelize = require('../config/sequelize');

const Location = sequelize.define('Location', {
    street: { type: Sequelize.STRING, allowNull: false },
    civicNumber: { type: Sequelize.STRING, allowNull: false },
    city: { type: Sequelize.STRING, allowNull: false },
    postalCode: { type: Sequelize.CHAR(5), allowNull: false },
    province: { type: Sequelize.STRING },
    region: { type: Sequelize.STRING },
    county: { type: Sequelize.STRING, allowNull: false }
});

module.exports = Location;
