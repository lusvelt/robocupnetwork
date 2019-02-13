const _ = require('lodash');
const jwt = require('jsonwebtoken');

const Manifestation = require('../../models/Manifestation');
const User = require('../../models/User');
const log = require('../../config/consoleMessageConfig');

const authIo = (clientsIo, socket, room) => {

    const selectManifestation = async (data, callback) => {
        const _manifestation = data.manifestation;
        const _user = data.user;

        try {
            const _user_ = jwt.decode(socket.handshake.query.token);

            if (_user_.id !== _user.id)
                throw new Error();

            const user = await User.findById(_user.id);
            const token = await user.regenerateAuthToken(_manifestation);
            
            callback({ token });
            log.verbose('Manifestation selected');
        } catch (err) {
            callback(new Error());
        }
    };

    const unsetManifestation = async (data, callback) => {
        const _user = data.user;

        try {
            const _user_ = jwt.decode(socket.handshake.query.token);

            if (_user_.id !== _user.id)
                throw new Error();

            const user = await User.findById(_user.id);
            const token = await user.regenerateAuthToken();

            callback({ token });
            log.verbose('Manifestation unset');
        } catch (err) {
            callback(new Error());
        }
    };

    socket.on('selectManifestation', selectManifestation);
    socket.on('unsetManifestation', unsetManifestation);
};

module.exports = authIo;
