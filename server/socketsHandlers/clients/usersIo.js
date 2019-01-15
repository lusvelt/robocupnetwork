const _ = require('lodash');
const User = require('../../models/User');
const Role = require('../../models/Role');
const utils = require('../../database/utils');

const usersIo = (clientsIo, socket) => {
/*const createAction = async (_action, callback) => {
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
  };*/

    const createUser = async (_user, callback) => {
        try {
            const user = await User.create(_.omit(_user,['roles']));
            if(!user)
                throw new Error();
            const promises = [];
            _user.roles.forEach(_role => {
                promises.push(new Promise((resolve, reject) => {
                    Role.findById(_role.id)
                        .then(role => user.addRole(role))
                        .then(result => resolve(result))
                        .catch(err => reject(err));
                }));
            });

            const result = await Promise.all(promises);
            if(!result)
                throw new Error();
            callback(user);
            socket.broadcast.emit('createUser', user);
        } catch (err) {
            callback (new Error());
        }
    };

    const getUsers = async (args, callback) => {
        try {
            const users = await User.getUsersList();
            callback(users);
        } catch (err) {
            callback(new Error());
        }
    };

    socket.on('createUser', createUser);
    socket.on('getUsers', getUsers);
};

module.exports = usersIo;
