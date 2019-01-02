const _ = require('lodash');

const ActionType = require('../../models/ActionType');

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

    socket.on('getActionTypes', getActionTypes);
    socket.on('createActionType', createActionType);
    socket.on('editActionType', editActionType);
    socket.on('removeActionType', removeActionType);

};

module.exports = privilegesIo;