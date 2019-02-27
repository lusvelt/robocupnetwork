const Sequelize = require('sequelize');
const _ = require('lodash');

const sequelize = require('../config/sequelize');

const Lineup = require('./Lineup');
const Phase = require('./Phase');

const Manifestation = sequelize.define('Manifestation', {
    name: { type: Sequelize.STRING, allowNull: false },
    description: { type: Sequelize.TEXT },
    start: { type: Sequelize.DATEONLY, allowNull: false },
    end: { type: Sequelize.DATEONLY, allowNull: false }
});

Manifestation.getManifestationsList = () => Manifestation.findAll({ attributes: { exclude: ['createdAt', 'updatedAt'] } });

Manifestation.prototype.getQRCodesData = async function () {
    const teams = await this.getTeams({
        attributes: { exclude: ['createdAt', 'updatedAt'] },
        include: [{
            model: Phase,
            attributes: { exclude: ['createdAt', 'updatedAt'] }
        }]
    });
    return teams.map(team => _.omit(JSON.parse(JSON.stringify(team)), ['TeamParticipatesToManifestation']));
};

module.exports = Manifestation;
