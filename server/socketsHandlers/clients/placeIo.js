const _ = require('lodash');
const Place = require('../../models/Place');
const log = require('../../config/consoleMessageConfig');

const placeIo = (clientsIo, socket, room) => {

    const createPlace = async (_place, callback) => {
        try {
            const place = await Place.create(_place);
            if (!place)
                throw new Error();
            callback(place);
            socket.broadcast.emit('createPlace', place);
            log.verbose('Place created');
        } catch (err) {
            callback(new Error());
        }
    };

    const getPlaces = async (args, callback) => {
        try {
            const place = await Place.getPlacesList();
            callback(place);
            log.verbose('Places request');
        } catch (err) {
            callback(new Error());
        }
    };

    const editPlace = async (_place, callback) => {
        try {
            const id = _place.id;
            const place = _.omit(_place, ['id']);
            const result = await Place.update(place, {
                where: {
                    id
                }
            });
            if (!result)
                throw new Error();
            callback(result);
            socket.broadcast.emit('editPlace', _place);
            log.verbose('Place modified');
        } catch (err) {
            callback(new Error());
        }
    };

    const removePlace = async (_place, callback) => {
        try {
            const id = _place.id;
            const result = await Place.destroy({
                where: {
                    id
                }
            });
            if (!result)
                throw new Error();
            callback(result);
            socket.broadcast.emit('removePlace', _place);
            log.verbose('Place removed');
        } catch (err) {
            callback(new Error());
        }
    };

    socket.on('createPlace', createPlace);
    socket.on('removePlace', removePlace);
    socket.on('getPlaces', getPlaces);
    socket.on('editPlace', editPlace);
};

module.exports = placeIo;
