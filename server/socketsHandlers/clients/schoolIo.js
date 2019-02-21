const _ = require('lodash');
const School = require('../../models/School');
const Place = require('../../models/Place');
const log = require('../../config/consoleMessageConfig');

const schoolIo = (clientsIo, socket, room) => {

    const createSchool = async (_school, callback) => {
        try {
            const school = await School.create(_school);
            if (!school)
                throw new Error();

            Place.findById(_school.place[0].id)
                .then(place => school.setPlace(place));

            callback(school);
            socket.broadcast.emit('createSchool', school);
            log.verbose('School created');
        } catch (err) {
            callback(new Error());
        }
    };

    const getSchools = async (args, callback) => {
        try {
            const school = await School.getSchoolsList();
            callback(school);
            log.verbose('School data request');
        } catch (err) {
            callback(new Error());
        }
    };

    const editSchool = async (_school, callback) => {
        try {
            const id = _school.id;
            const school = _.omit(_school, ['id']);
            const result = await School.update(school, {
                where: {
                    id
                }
            });
            if (!result)
                throw new Error();
            callback(result);
            socket.broadcast.emit('editSchool', _school);
            log.verbose('School modified');
        } catch (err) {
            callback(new Error());
        }
    };

    const removeSchool = async (_school, callback) => {
        try {
            const id = _school.id;
            const result = await School.destroy({
                where: {
                    id
                }
            });
            if (!result)
                throw new Error();
            callback(result);
            socket.broadcast.emit('removeSchool', _school);
            log.verbose('School removed');
        } catch (err) {
            callback(new Error());
        }
    };

    socket.on('createSchool', createSchool);
    socket.on('removeSchool', removeSchool);
    socket.on('getSchools', getSchools);
    socket.on('editSchool', editSchool);
};

module.exports = schoolIo;
