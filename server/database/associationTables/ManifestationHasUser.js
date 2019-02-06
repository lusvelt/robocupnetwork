const Sequelize = require('sequelize');

const sequelize = require('../../config/sequelize');

const ManifestationHasUser = sequelize.define('ManifestationHasUser', {}, {
    tableName: 'ManifestationHasUser'
});

module.exports = ManifestationHasUser;
