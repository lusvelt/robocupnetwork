const _ = require('lodash');
const AgeRange = require('../../models/AgeRange');
const log = require('../../config/consoleMessageConfig');

const ageRangeIo = (clientsIo, socket) => {

    const createAgeRange = async (_ageRange, callback) => {
        try {
            const ageRange = await AgeRange.create(_ageRange);
            if (!ageRange)
                throw new Error();
            callback(ageRange);
            socket.broadcast.emit('createAgeRange', ageRange);
            log.verbose('AgeRange created');
        } catch (err) {
            callback(new Error());
        }
    };

    const getAgeRanges = async (args, callback) => {
        try {
            const ageRange = await AgeRange.getAgeRangesList();
            callback(ageRange);
            log.verbose('AgeRanges request');
        } catch (err) {
            callback(new Error());
        }
    };

    const editAgeRange = async (_ageRange, callback) => {
        try {
            const id = _ageRange.id;
            const ageRange = _.omit(_ageRange, ['id']);
            const result = await AgeRange.update(ageRange, {
                where: {
                    id
                }
            });
            if (!result)
                throw new Error();
            callback(result);
            socket.broadcast.emit('editAgeRange', _ageRange);
            log.verbose('AgeRange modified');
        } catch (err) {
            callback(new Error());
        }
    };

    const removeAgeRange = async (_ageRange, callback) => {
        try {
            const id = _ageRange.id;
            const result = await AgeRange.destroy({
                where: {
                    id
                }
            });
            if (!result)
                throw new Error();
            callback(result);
            socket.broadcast.emit('removeAgeRange', _ageRange);
            log.verbose('AgeRange removed');
        } catch (err) {
            callback(new Error());
        }
    };

    socket.on('createAgeRange', createAgeRange);
    socket.on('removeAgeRange', removeAgeRange);
    socket.on('getAgeRanges', getAgeRanges);
    socket.on('editAgeRange', editAgeRange);
};

module.exports = ageRangeIo;
