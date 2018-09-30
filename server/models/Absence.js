const Sequelize = require('sequelize');
const sequelize = require('../config/sequelize');

const Absence = sequelize.define('Absence', {
    from: { type: Sequelize.DATE, allowNull: false },
    to: { type: Sequelize.DATE, allowNull: false }
});

module.exports = Absence;
