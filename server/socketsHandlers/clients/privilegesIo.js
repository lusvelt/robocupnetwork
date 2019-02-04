const _ = require('lodash');
const log = require('../../config/consoleMessageConfig');

const ActionType = require('../../models/ActionType');
const Action = require('../../models/Action');
const Role = require('../../models/Role');
const Module = require('../../models/Module');

const privilegesIo = (clientsIo, socket) => {

    const getActionTypes = async (args, callback) => {
        try {
            const actionTypes = await ActionType.getActionTypesList();
            callback(actionTypes);
            log.verbose('ActionType created');
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
            const action = await Action.getActionsList();
            callback(action);
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

    const updateManifestationDependency = async (data, callback) => {
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

    const getRoles = async(args, callback) => {
        try {
            const roles = await Role.getRolesList();
            callback(roles);
            log.verbose('Role data request');
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
    socket.on('updateManifestationDependency', updateManifestationDependency);
    
    socket.on('createRole',createRole);
    socket.on('getRoles',getRoles);
    socket.on('removeRole',removeRole);
    socket.on('editRole', editRole);
    
    socket.on('getModules', getModules);
    socket.on('createModule',createModule);
    socket.on('editModule',editModule);
    socket.on('removeModule', removeModule);
    socket.on('updateSelectedModules', updateSelectedModules);
};

module.exports = privilegesIo;
