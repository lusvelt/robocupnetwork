const sequelize = require('../config/sequelize');

const utils = {
    getForeignKey: (model) => 'id' + model.name.substr(0, 1).toUpperCase() + model.name.substr(1)
};

module.exports = utils;