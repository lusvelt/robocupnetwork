const Sequelize = require('sequelize');
const sequelize = require('../config/sequelize');

const Shift = sequelize.define('Shift', {
    from: { type: Sequelize.DATE, allowNull: false },
    to: { type: Sequelize.DATE, allowNull: false }
});

module.exports = Shift;
