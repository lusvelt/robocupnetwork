const _ = require('lodash');
const User = require('../../models/User');
const Role = require('../../models/Role');
const Manifestation = require('../../models/Manifestation');
const UserHasRoleInManifestation = require('../../database/associationTables/UserHasRoleInManifestation');
const log = require('../../config/consoleMessageConfig');

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
            const user = await User.create(_.omit(_user,['manifestations']));
            if(!user)
                throw new Error();
            
            const promises = [];
            _user.manifestations.forEach(_manifestation => {
                promises.push(new Promise((resolve, reject) => {
                    Manifestation.findById(_manifestation.id)
                        .then(manifestation => {
                            promises.push(user.addManifestation(manifestation));
                            _manifestation.roles.forEach(_role =>
                                promises.push(UserHasRoleInManifestation.create({ userId: user.dataValues.id, manifestationId: _manifestation.id, roleId: _role.id})));
                        });
                }));
            });

            const result = await Promise.all(promises);
            if(!result)
                throw new Error();

            callback(user);
            socket.broadcast.emit('createUser', user);
            log.verbose('User created');
        } catch (err) {
            callback (new Error());
        }
    };

    const editUser = async (_user, callback) => {
        try {
            const id = _user.id;
            const user = _.omit(_user, ['id','birthDate','isAdmin']);
            const result = await User.update(user, { where: { id } });
            if (!result)
                throw new Error();
            callback(result);
            socket.broadcast.emit('editUser', _user);
            log.verbose('User modified');
        } catch (err) {
            callback(new Error());
        }
    };

    const removeUser = async (_user, callback) => {
        try {
            const id = _user.id;
            const result = await User.destroy({ where: { id } });
            if (!result)
                throw new Error();
            callback(result);
            socket.broadcast.emit('removeUser', _user);
            log.verbose('User removed');
        } catch (err) {
            callback(new Error());
        }
    };

    const getUsers = async (args, callback) => {
        try {
            const users = await User.getUsersList();
            log.verbose('User data request');
            callback(users);
        } catch (err) {
            callback(new Error());
        }
    };

    socket.on('createUser', createUser);
    socket.on('getUsers', getUsers);
    socket.on('editUser',editUser);
    socket.on('removeUser',removeUser);
};

module.exports = usersIo;
