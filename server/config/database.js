const sequelize = require('./sequelize');
const seed = require('../database/seed');
const log = require('../config/consoleMessageConfig');

const database = {
    initialize: async (reset) => {
        try {
            await sequelize.authenticate();
            log.info('Connection to database has been established successfully.');

            require('../database/models');
            log.debug('Models initialized succesfully');
            
            require('./../database/associations');
            log.debug('Associations initialized succesfully');
            
            if (reset)
                log.debug('Resetting database forcedly...');
            await sequelize.sync({ force: reset });
            if (reset) {
                log.debug('Initializing data...');
                await seed();
                log.debug('Data initialized successfully');
            }
            log.info('Database initialized successfully');
        } catch (err) {
            log.error(err);
        }
    }
};

module.exports = database;
