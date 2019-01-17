const _ = require('lodash');
const Manifestation = require('../../models/Manifestation');
const log = require('../../config/consoleMessageConfig');

const manifestationIo = (clientsIo, socket) => {

    const createManifestation = async (_manifestation, callback) => {
        try {
            const manifestation = await Manifestation.create(_manifestation);
            if(!manifestation)
                throw new Error();
            callback(manifestation);
            socket.broadcast.emit('createManifestation',manifestation);
            log.verbose('Manifestation created');
        } catch (err) {
            callback (new Error());
        }
    };

    const getManifestations = async (args,callback) => {
        try {
            const manifestations = await Manifestation.getManifestationsList();
            callback(manifestations);
            log.verbose('Manifestation data request');
        }catch (err) {
            callback(new Error());
        }
    };

    const editManifestation = async (_manifestation, callback) => {
        try {
            const id = _manifestation.id;
            const manifestation = _.omit(_manifestation, ['id']);
            const result = await Manifestation.update(manifestation, { where: { id } });
            if (!result)
                throw new Error();
            callback(result);
            socket.broadcast.emit('editManifestation', _manifestation);
            log.verbose('Manifestation modified');
        } catch (err) {
            callback(new Error());
        }
    };

    const removeManifestation = async (_manifestation, callback) => {
        try {
            const id = _manifestation.id;
            const result = await Manifestation.destroy({ where: { id } });
            if (!result)
                throw new Error();
            callback(result);
            socket.broadcast.emit('removeManifestation', _manifestation);
            log.verbose('Manifestation removed');
        } catch (err) {
            callback(new Error());
        }
    };

    socket.on('createManifestation', createManifestation);
    socket.on('removeManifestation',removeManifestation);
    socket.on('getManifestations',getManifestations);
    socket.on('editManifestation',editManifestation);
};

module.exports = manifestationIo;
