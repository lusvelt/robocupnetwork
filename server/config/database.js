const sequelize = require('./sequelize');

const User = require('../models/User');

const database = {
    initialize: async () => {
        await sequelize.sync({ force: process.env.NODE_ENV !== 'production' });
    }
};

module.exports = database;