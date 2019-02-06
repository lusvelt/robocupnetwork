const Sequelize = require('sequelize');

const sequelize = require('../../config/sequelize');

const RunHasParam = sequelize.define('RunHasParam', {
    value: { type: Sequelize.STRING, allowNull: false }
}, {
    tableName: 'RunHasParam'
});

module.exports = RunHasParam;