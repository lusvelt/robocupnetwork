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

    const getActions= async(args,callback) => {
        try {
            const action = await Action.getActionsList();
            callback(action);
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

    const getRoles= async(args,callback) => {
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
    

    socket.on('getActionTypes', getActionTypes);
    socket.on('createActionType', createActionType);
    socket.on('editActionType', editActionType);
    socket.on('removeActionType', removeActionType);

    socket.on('getActions',getActions);
    socket.on('removeAction', removeAction);
    socket.on('editAction', editAction);

    socket.on('getRoles',getRoles);
    socket.on('removeRole',removeRole);
    socket.on('editRole', editRole);

};

module.exports = privilegesIo;