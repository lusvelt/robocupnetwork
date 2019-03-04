const Sequelize = require('sequelize');
const sequelize = require('../config/sequelize');
const Category = require('./Category');

const Phase = sequelize.define('Phase', {
    name: { type: Sequelize.STRING, allowNull: false },
    description: { type: Sequelize.TEXT },
    start: { type: Sequelize.DATE, allowNull: false },
    end: { type: Sequelize.DATE, allowNull: false },
    numAdmittedTeams: { type: Sequelize.INTEGER, allowNull: false },
    numPassingTeams: { type: Sequelize.INTEGER }
});

Phase.getPhasesList = () => Phase.findAll(
    { attributes: {exclude: ['createdAt', 'updatedAt'] },
    include: [{ 
        model: Category,
        attributes: { exclude: ['createdAt', 'updatedAt'] },
    }]
    });

module.exports = Phase;
