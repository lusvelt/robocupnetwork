const Sequelize = require('sequelize');
const sequelize = require('../config/sequelize');

const Phase = sequelize.define('Phase', {
    name: { type: Sequelize.STRING, allowNull: false },
    description: { type: Sequelize.TEXT },
    start: { type: Sequelize.DATE, allowNull: false },
    end: { type: Sequelize.DATE, allowNull: false },
    numAdmittedTeams: { type: Sequelize.INTEGER, allowNull: false },
    numPassingTeams: { type: Sequelize.INTEGER }
});

Phase.isDefine = () => {
    sequelize.isDefined('Phase');
};

module.exports = Phase;
