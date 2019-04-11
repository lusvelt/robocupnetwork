const sequelize = require('./sequelize');
const seed = require('../database/seed');
const log = require('./logger');

const database = {
    initialize: async (options) => {
        try {
            await sequelize.authenticate();
            log.info('Connection to database has been established successfully.');

            require('../database/models');
            log.info('Models initialized succesfully');

            require('./../database/associations');
            log.info('Associations initialized succesfully');

            if (options.reset)
                log.info('Resetting database forcedly...');
            await sequelize.sync({ force: options.reset, alter: true });
            if (options.reset || options.seed) {
                log.info('Initializing data...');
                await seed();
                log.info('Data initialized successfully');
                process.exit();
            }
            log.info('Database initialized successfully');
        } catch (err) {
            log.error(err);
        }
    }
};

module.exports = database;
