const sequelize = require('./sequelize');
const seed = require('../database/seed');

const database = {
    initialize: async (reset) => {
        try {
            await sequelize.authenticate();
            console.log('Connection to database has been established successfully.');
            if (reset){
                console.log('Resetting database forcedly...');
                require('../database/models');
                console.log('Models initialized succesfully');
                require('./../database/associations');
                console.log('Associations initialized succesfully');
            }
            await sequelize.sync({ force: reset });
            if (reset) await seed();
            console.log('Database initialized successfully');
        } catch (err) {
            console.error(err);
        }
    }
};

module.exports = database;
