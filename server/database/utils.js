const sequelize = require('../config/sequelize');

const utils = {
    getForeignKey: (model) => {
        var name = model.name;
        name = name.toLowerCase() + 'Id';

        return(name);
    },

    getDate: (string) => {
        string = string.slice(0, 10);
        return string;
    }
};

module.exports = utils;
