const Sequelize = require('sequelize');

const sequelize = require('../../config/sequelize');

const RunInvolvesLineup = sequelize.define('RunInvolvesLineup', {
    runId: { type: Sequelize.INTEGER, primaryKey: true, allowNull: false },
    lineupId: { type: Sequelize.INTEGER, primaryKey: true, allowNull: false },
    signId: { type: Sequelize.INTEGER, primaryKey: true, allowNull: false }
});

module.exports = RunInvolvesLineup;
