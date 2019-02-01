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
            const manifestation = _.omit(_manifestation, ['id','start','end','placeId']);
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

    const updateStart = async (args, callback) => {
        const _manifestation = args.manifestation;
        const start = args.startDate;
        console.log(start);
        try {
            const manifestation = await Manifestation.findById(_manifestation.id);
            const result = await manifestation.update({ start });
            
            if (!result)
                throw new Error();

            callback(result);
        } catch (err) {
            callback(new Error());
        }
    };

    const updateEnd = async (args, callback) => {
        const _manifestation = args.manifestation;
        const end = args.endDate;
        console.log(end);
        try {
            const manifestation = await Manifestation.findById(_manifestation.id);
            const result = await manifestation.update({ end });

            if (!result)
                throw new Error();

            callback(result);
        } catch (err) {
            callback(new Error());
        }
    };

    socket.on('createManifestation', createManifestation);
    socket.on('removeManifestation',removeManifestation);
    socket.on('getManifestations',getManifestations);
    socket.on('editManifestation',editManifestation);
    socket.on('updateStart',updateStart);
    socket.on('updateEnd',updateEnd);
};

module.exports = manifestationIo;
