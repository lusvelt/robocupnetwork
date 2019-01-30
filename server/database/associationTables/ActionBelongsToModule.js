const Sequelize = require('sequelize');

const sequelize = require('../../config/sequelize');

const ActionBelongsToModule = sequelize.define('ActionBelongsToModule', {}, {
    tableName: 'ActionBelongsToModule'
});

module.exports = ActionBelongsToModule;
