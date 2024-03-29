const Sequelize = require('sequelize');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const jwt = require('jsonwebtoken');

const sequelize = require('../config/sequelize');
const { saltRounds } = require('../config/values');
const Manifestation = require('./Manifestation');
const Role = require('./Role');
const ActionType = require('./ActionType');
const UserHasRole = require('../database/associationTables/UserHasRole');

const User = sequelize.define('User', {
    name: { type: Sequelize.STRING, allowNull: false },
    surname: { type: Sequelize.STRING, allowNull: false },
    birthDate: { type: Sequelize.DATEONLY, allowNull: true },
    email: { type: Sequelize.STRING, allowNull: false, unique: true },
    password: { type: Sequelize.STRING, allowNull: false },
    isAdmin: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: 0 }
});

User.beforeCreate((user, options) => {
    const hashedPassword = bcrypt.hashSync(user.password, saltRounds);
    user.password = hashedPassword;
});

User.beforeUpdate((user, options) => {
    const hashedPassword = bcrypt.hashSync(user.password, saltRounds);
    user.password = hashedPassword;
});

User.generateAuthToken = async (email, clearTextPassword) => {
    const user = await User.findOne({ where: { email } });

    const jwtPayload = _.pick(user, ['id', 'name', 'surname', 'email', 'isAdmin']);

    try {
        const items = await UserHasRole.findAll({ where: { userId: jwtPayload.id }});

        let promises = [];
        items.forEach(association =>
            promises.push(Role.findById(association.dataValues.roleId)));

        const basicRoles = await Promise.all(promises);

        promises = [];
        basicRoles.forEach(role => promises.push(role.getActions()));

        const basicActionsPerRole = await Promise.all(promises);
        let basicActions = [];
        basicActionsPerRole.forEach(_actions => {
            _actions.forEach(_action => {
                if (basicActions.findIndex(action => action.id === _action.id) === -1)
                    basicActions.push(_action);
            });
        });

        promises = [];
        basicActions.forEach(action => promises.push(new Promise((resolve, reject) => {
            const actionTypesPromise = action.getActionTypes();
            const modulesPromise = action.getModules();

            Promise.all([actionTypesPromise, modulesPromise])
                .then(results => {
                    action.dataValues.actionTypes = results[0];
                    action.dataValues.modules = results[1];
                    resolve();
                })
                .catch(err => reject(err));
        })));
        await Promise.all(promises);

        basicActions = basicActions.map(action => {
            return {
                alias: action.dataValues.alias,
                actionTypes: action.dataValues.actionTypes.map(actionType => actionType.dataValues.alias),
                modules: action.dataValues.modules.map(_module => _module.dataValues.alias)
            };
        });

        jwtPayload.basicRoles = basicRoles;
        jwtPayload.basicActions = basicActions;
    } catch (err) {
        // Error handling
    }

    if (!user || !bcrypt.compareSync(clearTextPassword, user.password))
        throw new Error();

    const token = jwt.sign(jwtPayload, process.env.JWT_SECRET).toString();

    return token;
};

User.getUsersList = () => User.findAll({ attributes: { exclude: ['password', 'createdAt', 'updatedAt'] } });

User.prototype.regenerateAuthToken = async function (_manifestation) {
    const jwtPayload = {
        id: this.id,
        name: this.name,
        surname: this.surname,
        email: this.email,
        isAdmin: this.isAdmin
    };


    try {
        const items = await UserHasRole.findAll({ where: { userId: jwtPayload.id }});

        let promises = [];
        items.forEach(association =>
            promises.push(Role.findById(association.dataValues.roleId)));

        const basicRoles = await Promise.all(promises);

        promises = [];
        basicRoles.forEach(role => promises.push(role.getActions()));

        const basicActionsPerRole = await Promise.all(promises);
        let basicActions = [];
        basicActionsPerRole.forEach(_actions => {
            _actions.forEach(_action => {
                if (basicActions.findIndex(action => action.id === _action.id) === -1)
                    basicActions.push(_action);
            });
        });

        promises = [];
        basicActions.forEach(action => promises.push(new Promise((resolve, reject) => {
            const actionTypesPromise = action.getActionTypes();
            const modulesPromise = action.getModules();

            Promise.all([actionTypesPromise, modulesPromise])
                .then(results => {
                    action.dataValues.actionTypes = results[0];
                    action.dataValues.modules = results[1];
                    resolve();
                })
                .catch(err => reject(err));
        })));
        await Promise.all(promises);

        basicActions = basicActions.map(action => {
            return {
                alias: action.dataValues.alias,
                actionTypes: action.dataValues.actionTypes.map(actionType => actionType.dataValues.alias),
                modules: action.dataValues.modules.map(_module => _module.dataValues.alias)
            };
        });

        jwtPayload.basicRoles = basicRoles;
        jwtPayload.basicActions = basicActions;
    } catch (err) {
        // Error handling
    }


    if (_manifestation) {
        try {
            const manifestation = await Manifestation.findById(_manifestation.id);
            const userHasRoleInManifestationAssociations = await this.getUserHasRoleInManifestations({ where: { manifestationId: _manifestation.id }});

            let promises = [];
            userHasRoleInManifestationAssociations.forEach(association =>
                promises.push(Role.findById(association.dataValues.roleId)));

            const roles = await Promise.all(promises);

            promises = [];
            roles.forEach(role => promises.push(role.getActions()));

            const actionsPerRole = await Promise.all(promises);
            let actions = [];
            actionsPerRole.forEach(_actions => {
                _actions.forEach(_action => {
                    if (actions.findIndex(action => action.id === _action.id) === -1)
                        actions.push(_action);
                });
            });

            promises = [];
            actions.forEach(action => promises.push(new Promise((resolve, reject) => {
                const actionTypesPromise = action.getActionTypes();
                const modulesPromise = action.getModules();

                Promise.all([actionTypesPromise, modulesPromise])
                    .then(results => {
                        action.dataValues.actionTypes = results[0];
                        action.dataValues.modules = results[1];
                        resolve();
                    })
                    .catch(err => reject(err));
            })));
            await Promise.all(promises);

            actions = actions.map(action => {
                return {
                    alias: action.dataValues.alias,
                    actionTypes: action.dataValues.actionTypes.map(actionType => actionType.dataValues.alias),
                    modules: action.dataValues.modules.map(_module => _module.dataValues.alias)
                };
            });

            jwtPayload.manifestation = manifestation;
            jwtPayload.roles = roles;
            jwtPayload.actions = actions;
        } catch (err) {
            // Error handling
        }
    }

    const token = jwt.sign(jwtPayload, process.env.JWT_SECRET).toString();

    return token;
};

module.exports = User;
