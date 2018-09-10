const sequelize = require('./sequelize');

const database = {
    initialize: async () => {
      try {
        await sequelize.authenticate();
        console.log('Connection to database has been established successfully.');
        await sequelize.sync({ force: process.env.NODE_ENV !== 'production' });
        console.log('Database initialized successfully');
      } catch (err) {
        console.error(err);
      }
    }
};

module.exports = database;
