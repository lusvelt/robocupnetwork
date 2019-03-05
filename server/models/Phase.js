const Sequelize = require('sequelize');
const sequelize = require('../config/sequelize');
const Category = require('./Category');
const _ = require('lodash');

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

Phase.prototype.getQRCodesData = async function () {
    let teams = await this.getTeams({
        attributes: { exclude: ['createdAt', 'updatedAt'] },
        include: [{
            model: Phase,
            attributes: ['id', 'name']
        }]
    });
    teams = JSON.parse(JSON.stringify(teams));
    teams = teams.map(team => {
        team.Phases = team.Phases.map(phase => _.omit(phase, ['TeamIsInPhase']));
        return team;
    });
    teams = teams.map(team => _.omit(team, ['TeamIsInPhase']));
    return teams;
};

module.exports = Phase;
