const Sequelize = require('sequelize');
const sequelize = require('../config/sequelize');

const Phase = sequelize.define('Phase', {
    name: { type: Sequelize.STRING, allowNull: false },
    description: { type: Sequelize.TEXT },
    start: { type: Sequelize.DATEONLY, allowNull: false },
    end: { type: Sequelize.DATEONLY, allowNull: false },
    numAdmittedTeams: { type: Sequelize.INTEGER, allowNull: false },
    numPassingTeams: { type: Sequelize.INTEGER }
});

module.exports = Phase;
