const _ = require('lodash');
const log = require('../../config/consoleMessageConfig');

const ActionType = require('../../models/ActionType');
const Action = require('../../models/Action');
const Role = require('../../models/Role');
const User = require('../../models/User');
const Manifestation = require('../../models/Manifestation');
const Module = require('../../models/Module');
const UserHasRole = require('../../database/associationTables/UserHasRole');
const ManifestationHasUser = require('../../database/associationTables/ManifestationHasUser');
const UserHasRoleInManifestation = require('../../database/associationTables/UserHasRoleInManifestation');

const privilegesIo = (clientsIo, socket, room) => {

    const getActionTypes = async (args, callback) => {
        try {
            const actionTypes = await ActionType.getActionTypesList();
            callback(actionTypes);
            log.verbose('ActionType data request');
        } catch (err) {
            callback(new Error());
        }
    };

    const createActionType = async (actionType, callback) => {
        try {
            const result = await ActionType.create(actionType);
            if (!result)
                throw new Error();
            callback(result);
            socket.broadcast.emit('createActionType', result);
            log.verbose('ActionType created');
        } catch (err) {
            callback(new Error());
        }
    };

    const editActionType = async (_actionType, callback) => {
        try {
            const id = _actionType.id;
            const actionType = _.omit(_actionType, ['id']);
            const result = await ActionType.update(actionType, { where: { id } });
            if (!result)
                throw new Error();
            callback(result);
            socket.broadcast.emit('editActionType', _actionType);
            log.verbose('ActionType modified');
        } catch (err) {
            callback(new Error());
        }
    };

    const removeActionType = async (_actionType, callback) => {
        try {
            const id = _actionType.id;
            const result = await ActionType.destroy({ where: { id } });
            if (!result)
                throw new Error();
            callback(result);
            socket.broadcast.emit('removeActionType', _actionType);
            log.verbose('ActionType removed');
        } catch (err) {
            callback(new Error());
        }
    };

    const getActions = async (args, callback) => {
        try {
            const actions = await Action.getActionsList();
            callback(actions);
            log.verbose('Actions data request');
        } catch (err) {
            callback(new Error());
        }
    };

    const createAction = async (_action, callback) => {
        try {
            const action = await Action.create(_.omit(_action, ['actionTypes']));
            if (!action)
                throw new Error();
            let promises = [];
            _action.actionTypes.forEach(_actionType => {
                promises.push(new Promise((resolve, reject) => {
                    ActionType.findById(_actionType.id)
                        .then(actionType => action.addActionType(actionType))
                        .then(result => resolve(result))
                        .catch(err => reject(err));
                }));
            });
            let result = await Promise.all(promises);

            promises = [];
            _action.modules.forEach(_module => {
                promises.push(new Promise((resolve, reject) => {
                    Module.findById(_module.id)
                        .then(mod => action.addModule(mod))
                        .then(result => resolve(result))
                        .catch(err => reject(err));
                }));
            });
            result = await Promise.all(promises);

            if (!result)
                throw new Error();
            action.dataValues.ActionTypes = _action.actionTypes;
            action.dataValues.Modules =_action.modules;
            callback(action);
            socket.broadcast.emit('createAction', action);
            log.verbose('Action created');
        } catch (err) {
            callback(new Error());
        }
    };

    const createRole = async (_role, callback) => {
        try {
            const role = await Role.create(_.omit(_role, ['actions']));
            if (!role)
                throw new Error();
            const promises = [];
            _role.actions.forEach(_action => {
                promises.push(new Promise((resolve, reject) => {
                    Action.findById(_action.id)
                        .then(action => role.addAction(action))
                        .then(result => resolve(result))
                        .catch(err => reject(err));
                }));
            });
            const result = await Promise.all(promises);
            if (!result)
                throw new Error();
            role.dataValues.Actions = _role.actions;
            callback(role);
            socket.broadcast.emit('createRole', role);
            log.verbose('Role created');
        } catch (err) {
            callback(new Error());
        }
    };

    const removeAction = async (_action, callback) => {
        try {
            const id = _action.id;
            const result = await Action.destroy({ where: { id } });
            if (!result)
                throw new Error();
            callback(result);
            socket.broadcast.emit('removeAction', _action);
            log.verbose('Action removed');
        } catch (err) {
            callback(new Error());
        }
    };

    const editAction = async (_action, callback) => {
        try {
            const id = _action.id;
            const action = _.omit(_action, ['id']);
            const result = await Action.update(action, { where: { id } });
            if (!result)
                throw new Error();
            callback(result);
            socket.broadcast.emit('editAction', _action);
            log.verbose('Action modified');
        } catch (err) {
            callback(new Error());
        }
    };

    const updateSelectedActionTypes = async (data, callback) => {
        try {
            const _action = data.action;
            const changedActionTypes = data.changedActionTypes;
            const id = _action.id;
            const action = await Action.findById(id);
            const promises = [];
            changedActionTypes.forEach(changedActionType => {
                promises.push(new Promise((resolve, reject) => {
                    ActionType.findById(changedActionType.id)
                        .then(actionType => {
                            if (changedActionType.selected)
                                return action.addActionType(actionType);
                            else
                                return action.removeActionType(actionType);
                        })
                        .then(result => resolve(result))
                        .catch(err => reject(err));
                }));
            });
            const result = await Promise.all(promises);
            callback(result);
        } catch (err) {
            callback(new Error());
        }
    };

    const updateUsersBasicRoles = async (data, callback) => {
        try {
            const _user = data.user;
            const changedBasicRoles = data.changedBasicRoles;
            const id = _user.id;
            const promises = [];
            await UserHasRole.destroy({where: {userId: id}});
            changedBasicRoles.forEach( role => {
                if(role.selected)
                    promises.push(UserHasRole.create({userId: id, roleId: role.id}));
            });
            const result = await Promise.all(promises);
            callback(result);
            socket.broadcast.emit('updateUsersBasicRoles', _user);
        } catch (err) {
            callback(new Error());
        }
    };

    const updateUserHasRolesInManifestation = async (data, callback) => {
        try {
            const promises = [];
            const user = data.user;
            const manifestation = data.manifestation;
            const userId = user.id;
            const manifestationId = manifestation.id;
            await UserHasRoleInManifestation.destroy({where: {userId: userId, manifestationId: manifestationId}});
            await ManifestationHasUser.destroy({where: {manifestationId: manifestationId, userId: userId}});
            if(manifestation.roles.length !== 0) {
                manifestation.roles.forEach(_role =>
                    promises.push(UserHasRoleInManifestation.create({ userId: userId, manifestationId: manifestationId, roleId: _role.id})));
                promises.push(ManifestationHasUser.create({manifestationId: manifestationId, userId: userId}));
            }
            const result = await Promise.all(promises);
            callback(result);
            socket.broadcast.emit('updateUserHasRolesInManifestation', user);
        } catch (err) {
            callback(new Error());
        }
    };

    const updateActionManifestationDependency = async (data, callback) => {
        const _action = data.action;
        const dependsOnManifestation = data.value;

        try {
            const action = await Action.findById(_action.id);
            const result = await action.update({ dependsOnManifestation });
            callback(result);
        } catch (err) {
            callback(new Error());
        }
    };

    const updateRoleManifestationDependency = async (data, callback) => {
        const _role = data.role;
        const dependsOnManifestation = data.value;

        try {
            const role = await Role.findById(_role.id);
            const result = await role.update({ dependsOnManifestation });
            callback(result);
        } catch (err) {
            callback(new Error());
        }
    };

    const getRoles = async(args, callback) => {
        try {
            const roles = await Role.getRolesList();
            callback(roles);
            log.verbose('Role data request');
        } catch (err) {
            callback(new Error());
        }
    };

    const getBasicRoles = async(args, callback) => {
        try {
            const roles = await Role.findAll({where: {dependsOnManifestation: false}});
            callback(roles);
            log.verbose('Basic Roles data request');
        } catch (err) {
            callback(new Error());
        }
    };

    const removeRole = async (_role, callback) => {
        try {
            const id = _role.id;
            const result = await Role.destroy({ where: { id } });
            if (!result)
                throw new Error();
            callback(result);
            socket.broadcast.emit('removeRole', _role);
            log.verbose('Role removed');
        } catch (err) {
            callback(new Error());
        }
    };

    const editRole = async (_role, callback) => {
        try {
            const id = _role.id;
            const role = _.omit(_role, ['id']);
            const result = await Role.update(role, { where: { id } });
            if (!result)
                throw new Error();
            callback(result);
            socket.broadcast.emit('editRole', _role);
            log.verbose('Role modified');
        } catch (err) {
            callback(new Error());
        }
    };

    const updateSelectedAction = async (data, callback) => {
        try {
            const _action = data.action;
            const changedAction = data.changedAction;
            const id = _action.id;
            const role = await Role.findById(id);
            const promises = [];
            changedAction.forEach(changedAction => {
                promises.push(new Promise((resolve, reject) => {
                    Action.findById(changedAction.id)
                        .then(action => {
                            if (changedAction.selected)
                                return role.addAction(action);
                            else
                                return role.removeAction(action);
                        })
                        .then(result => resolve(result))
                        .catch(err => reject(err));
                }));
            });
            const result = await Promise.all(promises);
            callback(result);
        } catch (err) {
            callback(new Error());
        }
    };

    const getModules = async (args, callback) => {
        try {
            const modules = await Module.getModulesList();
            callback(modules);
            log.verbose('Modules data request');
        } catch (err) {
            callback(new Error());
        }
    };

    const removeModule = async (_module, callback) => {
        try {
            const id = _module.id;
            const result = await Module.destroy({
                where: {
                    id
                }
            });
            if (!result)
                throw new Error();
            callback(result);
            socket.broadcast.emit('removeModule', _module);
            log.verbose('Module removed');
        } catch (err) {
            callback(new Error());
        }
    };

    const editModule = async (_module, callback) => {
        try {
            const id = _module.id;
            const module = _.omit(_module, ['id']);
            const result = await Module.update(module, {
                where: {
                    id
                }
            });
            if (!result)
                throw new Error();
            callback(result);
            socket.broadcast.emit('editModal', _module);
            log.verbose('Module modified');
        } catch (err) {
            callback(new Error());
        }
    };

    const createModule = async (module, callback) => {
        try {
            const result = await Module.create(module);
            if (!result)
                throw new Error();
            callback(result);
            socket.broadcast.emit('createModule', result);
            log.verbose('Module created');
        } catch (err) {
            callback(new Error());
        }
    };

    const updateSelectedModules = async (data, callback) => {
        try {
            const _action = data.action;
            const changedModules = data.changedModules;
            const id = _action.id;
            const action = await Action.findById(id);
            const promises = [];
            changedModules.forEach(changedModule => {
                promises.push(new Promise((resolve, reject) => {
                    Module.findById(changedModule.id)
                        .then(module_ => {
                            if (changedModule.selected)
                                return action.addModule(module_);
                            else
                                return action.removeModule(module_);
                        })
                        .then(result => resolve(result))
                        .catch(err => reject(err));
                }));
            });
            const result = await Promise.all(promises);
            callback(result);
        } catch (err) {
            callback(new Error());
        }
    };

    const getRolesFromId = async (_userId, callback) => {
        try {
            const promises = [];
            const items = await UserHasRole.findAll({ where: { userId: _userId}});
            items.forEach(item => promises.push(Role.findById(item.roleId)));
            const result = await Promise.all(promises);
            callback(result);
            log.verbose('Basic Roles by id data request');
        } catch (err) {
            callback(new Error());
        }

    };

    const getManifestationsFromId = async (_userId, callback) => {
        try {
            const promises = [];
            const items = await ManifestationHasUser.findAll({where: {userId: _userId}});
            items.forEach(item => promises.push(Manifestation.findById(item.manifestationId)));
            const result = await Promise.all(promises);
            callback(result);
            log.verbose('Manifestation by id data request');
        } catch (err) {
            callback(new Error());
        }
    };

    const getRolesInManifestationFromId = async (data, callback) => {
        try {
            const promises = [];
            const userId = data.userId;
            const manifestationId = data.manifestationId;
            const items = await UserHasRoleInManifestation.findAll({where: {userId: userId, manifestationId: manifestationId}});
            items.forEach(item => promises.push(Role.findById(item.roleId)));
            const result = await Promise.all(promises);
            callback(result);
            log.verbose('Roles in manifestation by id data request');
        } catch (err) {
            callback(new Error());
        }
    };

    const updateIsAdmin = async (data, callback) => {
        try {
            const user = data.user;
            const value = data.value;
            const result = await User.update({isAdmin: value}, {where: {id: user.id}});
            if (!result)
                throw new Error();
            callback(result);
            socket.broadcast.emit('updateIsAdmin', user);
            log.verbose('User is admin modified');
        } catch (err) {
            callback(new Error());
        }
    };

    /*
        const getRolesFromId = async (_userId, callback) => {
        try {
            const promises = [];
            promises.push(new Promise((resolve, reject) => {
                UserHasRole.findAll({ where: { userId: _userId}})
                .then (items => items.forEach(item => {
                    Role.findById(item.roleId)
                    .then(result => resolve(result))
                    .catch(err => reject(err));
                }))
                }));
            const result = await Promise.all(promises);
            callback(result);
            log.verbose('Roles data request');
        } catch (err) {
            callback(new Error());
        }

    };
    */


    socket.on('getActionTypes', getActionTypes);
    socket.on('createActionType', createActionType);
    socket.on('editActionType', editActionType);
    socket.on('removeActionType', removeActionType);
    socket.on('updateSelectedActionTypes', updateSelectedActionTypes);

    socket.on('getActions',getActions);
    socket.on('createAction', createAction);
    socket.on('removeAction', removeAction);
    socket.on('editAction', editAction);
    socket.on('updateSelectedAction', updateSelectedAction);
    socket.on('updateActionManifestationDependency', updateActionManifestationDependency);

    socket.on('createRole', createRole);
    socket.on('getRoles', getRoles);
    socket.on('removeRole', removeRole);
    socket.on('editRole', editRole);
    socket.on('getBasicRoles', getBasicRoles);
    socket.on('updateRoleManifestationDependency', updateRoleManifestationDependency);
    socket.on('getRolesFromId', getRolesFromId);
    socket.on('getManifestationsFromId', getManifestationsFromId);
    socket.on('getRolesInManifestationFromId',getRolesInManifestationFromId);
    socket.on('updateUsersBasicRoles', updateUsersBasicRoles);
    socket.on('updateUserHasRolesInManifestation', updateUserHasRolesInManifestation);
    socket.on('updateIsAdmin', updateIsAdmin);

    socket.on('getModules', getModules);
    socket.on('createModule',createModule);
    socket.on('editModule', editModule);
    socket.on('removeModule', removeModule);
    socket.on('updateSelectedModules', updateSelectedModules);
};

module.exports = privilegesIo;
