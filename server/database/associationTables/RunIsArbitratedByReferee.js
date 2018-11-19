const Sequelize = require('sequelize');

const sequelize = require('../../config/sequelize');

const RunIsArbitratedByReferee = sequelize.define('RunIsArbitratedByReferee', {});

module.exports = RunIsArbitratedByReferee;
