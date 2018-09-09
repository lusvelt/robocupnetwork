const sequelize = require('./sequelize');

const User = require('../models/User');

const database = {
    initialize: async () => {
      await sequelize.authenticate().then( () => {
        console.log('Connection has been established successfully.');
        sequelize.sync({
          force: process.env.NODE_ENV !== 'production'
        });
      })
        .catch(err => {
          console.error('Unable to connect to the database:', err);
      });
    }
};

module.exports = database;
