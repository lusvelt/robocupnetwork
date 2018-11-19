const sequelize = require('../config/sequelize');

const utils = {
    getForeignKey: (model) => {
        var name = model.name;
        name = name.toLowerCase() + 'Id';

        return(name);
    }
};

module.exports = utils;
