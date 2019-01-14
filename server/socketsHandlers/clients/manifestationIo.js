const _ = require('lodash');
const Manifestation = require('../../models/Manifestation');

const manifestationIo = (clientsIo, socket) => {
    const createManifestation = async (_manifestation, callback) => {
        try {
            const manifestation = await Manifestation.create(_manifestation);
            if(!manifestation)
                throw new Error();
            callback(_manifestation);
            socket.broadcast.emit('createManifestation',_manifestation);
        } catch (err) {
            callback (new Error());
        }
    };

    const getManifestations = async (args,callback) => {
        try {
            const manifestations = await Manifestation.getManifestationsList();
            callback(manifestations);
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
