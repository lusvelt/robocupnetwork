const Sequelize = require('sequelize');

const sequelize = require('../../config/sequelize');

const ManifestationHasUser = sequelize.define('ManifestationHasUser', { });

module.exports = ManifestationHasUser;
