const Sequelize = require('sequelize');
const sequelize = require('../config/sequelize');

const Place = sequelize.define('Place', {
    street: { type: Sequelize.STRING, allowNull: false },
    civicNumber: { type: Sequelize.STRING, allowNull: false },
    city: { type: Sequelize.STRING, allowNull: false },
    postalCode: { type: Sequelize.CHAR(5), allowNull: false },
    province: { type: Sequelize.STRING },
    region: { type: Sequelize.STRING },
    country: { type: Sequelize.STRING, allowNull: false }
});

Place.getPlacesList = () => Place.findAll({ attributes: { exclude: ['createdAt', 'updatedAt'] } });

module.exports = Place;
