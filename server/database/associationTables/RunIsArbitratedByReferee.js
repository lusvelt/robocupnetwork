const Sequelize = require('sequelize');

const sequelize = require('../../config/sequelize');

const RunIsArbitratedByReferee = sequelize.define('RunIsArbitratedByReferee', {}, {
    tableName: 'RunIsArbitratedByReferee'
});

module.exports = RunIsArbitratedByReferee;
