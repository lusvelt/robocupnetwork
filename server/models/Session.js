const Sequelize = require('sequelize');
const sequelize = require('../config/sequelize');

const Session = sequelize.define('Session', {
    start: { type: Sequelize.DATE, allowNull: false },
    end: { type: Sequelize.DATE, allowNull: false}
});

module.exports = Session;
