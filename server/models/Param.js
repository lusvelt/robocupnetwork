const Sequelize = require('sequelize');
const sequelize = require('../config/sequelize');

const Param = sequelize.define('Param', {
    name: { type: Sequelize.STRING, allowNull: false },
    type: { type: Sequelize.ENUM('string', 'int', 'float', 'array'), allowNull: false, defaultValue: 'int' },
    defaultValue: { type: Sequelize.STRING, allowNull: false },
    affectScore: { type: Sequelize.BOOLEAN, allowNull: false }
});

module.exports = Param;
