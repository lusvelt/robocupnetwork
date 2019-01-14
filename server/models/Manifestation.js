const Sequelize = require('sequelize');
const sequelize = require('../config/sequelize');

const Manifestation = sequelize.define('Manifestation', {
    name: { type: Sequelize.STRING, allowNull: false },
    description: { type: Sequelize.TEXT },
    start: { type: Sequelize.DATE, allowNull: false },
    end: { type: Sequelize.DATE, allowNull: false }
});

Manifestation.getManifestationsList = () => Manifestation.findAll({ attributes: { exclude: ['createdAt', 'updatedAt'] } });

module.exports = Manifestation;
