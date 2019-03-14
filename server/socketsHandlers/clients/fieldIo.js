const _ = require('lodash');
const Field = require('../../models/Field');
const PhaseHasField = require('../../database/associationTables/PhaseHasField');
const log = require('../../config/consoleMessageConfig');

const fieldIo = (clientsIo, socket, room) => {


    const findFieldsFromPhaseId = async (phase, callback) => {
        try {
            const fields = await PhaseHasField.findAll({where: {phaseId: phase.id}});
            const promises = [];
            fields.forEach(field => {
                promises.push(new Promise((resolve, reject) => {
                    Field.findById(field.fieldId)
                        .then(result => resolve(result));
                }));
            });
            const result = await Promise.all(promises);
            if (!result)
                throw new Error();
            callback(result);
            log.verbose('Field from phaseId request');
        } catch (err) {
            callback(new Error());
        }
    };

    const updateFieldStatus = async (data, callback) => {
        try {
            const id = data.field[0].id;
            const team = data.team;
            const result = await Field.update({status: 'running', team: team, score: 0},{where: {id}});
            if(!result)
                throw new Error();
            callback(result);
            socket.broadcast.emit('updateFieldStatus', result);
            log.verbose('Field status updated');

        } catch (err) {
            callback(new Error());
        }
    }

    const endRunOnField = async (field,callback) => {
        try {
            const id = field[0].id;
            console.log(id);
            const result = await Field.update({status:'free',team: null,score:null},{where: {id}});
            if (!result)
                throw new Error();
            callback(result);
            socket.broadcast.emit('endRunOnField',result);
            log.verbose('End run on field');
        } catch (err) {
            callback(new Error());
        }
    }

    const updateScoreOnField = async (data,callback) => {
        try {
            const id = data.field[0].id;
            const score = data.score;
            const result = await Field.update({score: score},{where: {id}});
            if (!result)
                throw new Error();
            callback(result);
            socket.broadcast.emit('updateScoreOnField',result);
        } catch (err) {
            throw(new Error());
        }
    }


    socket.on('findFieldsFromPhaseId',findFieldsFromPhaseId);
    socket.on('updateFieldStatus',updateFieldStatus);
    socket.on('endRunOnField',endRunOnField);
    socket.on('updateScoreOnField',updateScoreOnField);
};

module.exports = fieldIo;
