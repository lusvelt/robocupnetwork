const _ = require('lodash');

const User = require('../models/User');
const UserHasRole = require ('../database/associationTables/UserHasRole');
const Role = require ('../models/Role');

const register = async (req, res) => {
    const user = req.body;
    try {
        const dbInstance = await User.create(user);

        const promises = [];
        Role.find({where: {alias: 'user'}})
            .then(result => {
                promises.push(UserHasRole.create({userId: dbInstance.id, roleId: result.id }));
            });

        const result = await Promise.all(promises);

        const responseDbInstance = _.omit(dbInstance.dataValues, ['password', 'createdAt', 'updatedAt']);
        res.send(responseDbInstance);
    } catch (err) {
        if (err.original && err.original.errno === 1062) {
            res.status(400).send({ code: err.original.code });
        } else
            res.sendStatus(400);
    }
};

module.exports = register;
