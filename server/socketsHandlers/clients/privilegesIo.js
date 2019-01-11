const _ = require('lodash');

const ActionType = require('../../models/ActionType');
const Action = require('../../models/Action');
const Role = require('../../models/Role');

const privilegesIo = (clientsIo, socket) => {

    const getActionTypes = async (args, callback) => {
        try {
            const actionTypes = await ActionType.getActionTypesList();
            callback(actionTypes);
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
        } catch (err) {
            callback(new Error());
        }
    };

    const getActions = async (args, callback) => {
        try {
            const action = await Action.getActionsList();
            callback(action);
        } catch (err) {
            callback(new Error());
        }
    };

    const createAction = async (_action, callback) => {
        try {
            const action = await Action.create(_.omit(_action, ['actionTypes']));
            if (!action)
                throw new Error();
            const promises = [];
            _action.actionTypes.forEach(_actionType => {
                promises.push(new Promise((resolve, reject) => {
                    ActionType.findById(_actionType.id)
                        .then(actionType => action.addActionType(actionType))
                        .then(result => resolve(result))
                        .catch(err => reject(err));
                }));
            });
            const result = await Promise.all(promises);
            if (!result)
                throw new Error();
            action.dataValues.ActionTypes = _action.actionTypes;
            callback(action);
            socket.broadcast.emit('createAction', action);
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
        } catch (err) {
            callback(new Error());
        }
    };

    const updateSelectedActionTypes = async (data, callback) => {
        //da sistemare
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

    const getRoles = async(args,callback) => {
        try {
            const roles = await Role.getRolesList();
            callback(roles);
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
        } catch (err) {
            callback(new Error());
        }
    };

    const updateSelectedAction = async (data, callback) => {
        //da sistemare
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

    socket.on('getRoles',getRoles);
    socket.on('removeRole',removeRole);
    socket.on('editRole', editRole);

};

module.exports = privilegesIo;