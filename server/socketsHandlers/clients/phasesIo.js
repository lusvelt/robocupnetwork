const _ = require('lodash');
const sequelize = require('../../config/sequelize');
const Phase = require('../../models/Phase');
const Category = require('../../models/Category');
const User = require('../../models/User');
const Manifestation = require('../../models/Manifestation');
const AgeRange = require('../../models/AgeRange');
const log = require('../../config/logger');
const TeamHasUser = require('../../database/associationTables/TeamHasUser');
const Team = require('../../models/Team');
const Run = require('../../models/Run');
const Field = require('../../models/Field');
const TeamIsInPhase = require('../../database/associationTables/TeamIsInPhase');
const PhaseHasField = require('../../database/associationTables/PhaseHasField');

const phasesIo = (clientsIo, socket, room) => {

    const createPhase = async (data, callback) => {

        const _phase = data.phase;
        const _manifestation = data.manifestation;
        const _category = _phase.category;
        const _teams = _phase.teams;
        const _numField = _phase.numField;

        try {
            const phase = await Phase.create(_phase);
            if (!phase)
                throw new Error();

            let promises = [];

            Manifestation.findById(_manifestation.id)
                .then(manifestation => {
                    promises.push(manifestation.addPhase(phase));
                });

            promises = [];

            Category.findById(_category.id)
                .then(category => {
                    promises.push(category.addPhase(phase));
                });

            let fields = [];
            for(let i = 0; i <_numField; i++) {
                fields[i] = await Field.create({number: i+1,status: 'free'});
            }
            
            promises = [];
            fields.forEach(field => {
                promises.push(PhaseHasField.create({phaseId: phase.id, fieldId: field.id }));
            });

            promises = [];

            _teams.forEach(team => {
                promises.push(TeamIsInPhase.create({teamId: team.id, phaseId: phase.id}));
            });

            const result = await Promise.all(promises);
            if(!result)
                throw new Error();
            callback(phase);
            socket.broadcast.emit('createPhase', {phase,_manifestation});
            log.verbose('Phase created');
        } catch (err) {
            callback(new Error());
        }
    };

    const updatePhaseStart = async (data, callback) => {
        const _phase = data.phase;
        const _manifestation = data.manifestation;
        const start = data.startDate;
        try {
            const phase = await Phase.findById(_phase.id);
            const result = await phase.update({ start });

            if (!result)
                throw new Error();

            callback(result);
            socket.broadcast.emit('updatePhaseStart', {phase, _manifestation});
        } catch (err) {
            callback(new Error());
        }
    };

    const updatePhaseEnd = async (data, callback) => {
        const _phase = data.phase;
        const _manifestation = data.manifestation;
        const end = data.endDate;
        try {
            const phase = await Phase.findById(_phase.id);
            const result = await phase.update({ end });

            if (!result)
                throw new Error();

            callback(result);
            socket.broadcast.emit('updatePhaseEnd', {phase, _manifestation});
        } catch (err) {
            callback(new Error());
        }
    };

    const getPhasesInManifestation = async (_manifestation, callback) => {
        try {
            Manifestation.findById(_manifestation.id)
                .then(manifestation => manifestation.getPhases())
                .then(phases => callback(phases));

            log.verbose('Phases in manifestation data request');
        } catch (err) {
            callback(new Error());
        }
    };

    const getTeamsInPhase = async (_phase, callback) => {
        try {
            const promises = [];
            const items = await TeamIsInPhase.findAll({where: {phaseId: _phase.id}});
            items.forEach(item => promises.push(Team.findById(item.teamId)));
            const result = await Promise.all(promises);

            if (!result)
                throw new Error();

            callback(result);

            log.verbose('Teams in phase data request');
        } catch (err) {
            callback(new Error());
        }
    };

    const updateTeamsInPhase = async (data, callback) => {
        try {
            const phase = data.phase;
            const teams = data.teams;

            await TeamIsInPhase.destroy({where: {phaseId: phase.id}});

            const promises = [];

            teams.forEach(team => {
                promises.push(TeamIsInPhase.create({teamId: team.id, phaseId: phase.id}));
            });

            const result = await Promise.all(promises);

            if (!result)
                throw new Error();

            callback(result);

            log.verbose('Updated teams in phase data request');

        } catch (err) {
            callback(new Error());
        }
    };

    const editPhase = async (data, callback) => {
        try {
            const _phase = data.phase;
            const _manifestation = data.manifestation;
            const id = _phase.id;
            const phase = _.omit(_phase, ['id']);
            const result = await Phase.update(phase, {
                where: {
                    id
                }
            });
            if (!result)
                throw new Error();
            callback(result);
            socket.broadcast.emit('editPhase', {_phase, _manifestation});
            log.verbose('Phase modified');
        } catch (err) {
            callback(new Error());
        }
    };

    const removePhase = async (data, callback) => {
        try {
            const _phase = data.phase;
            const _manifestation = data.manifestation;
            const id = _phase.id;
            const result = await Phase.destroy({
                where: {
                    id
                }
            });
            if (!result)
                throw new Error();
            callback(result);
            socket.broadcast.emit('removePhase', {_phase,_manifestation});
            log.verbose('Phase removed');
        } catch (err) {
            callback(new Error());
        }
    };

    const getQRCodesData = async (_phase, callback) => {
        try {
            const phase = await Phase.findById(_phase.id);
            const data = await phase.getQRCodesData();
            callback(data);
        } catch (err) {
            callback(err);
        }
    };

    const deleteLowestRun = async (_phase, callback) => {
        try {
            const phaseId = _phase.id;
            const result = sequelize.query('UPDATE Runs SET Runs.status = NOW() WHERE ');
        } catch (err) {
            callback(err);
        }
    };

    socket.on('createPhase', createPhase);
    socket.on('removePhase', removePhase);
    socket.on('getPhasesInManifestation', getPhasesInManifestation);
    socket.on('editPhase', editPhase);
    socket.on('updatePhaseEnd',updatePhaseEnd);
    socket.on('updatePhaseStart', updatePhaseStart);
    socket.on('getTeamsInPhase',getTeamsInPhase);
    socket.on('updateTeamsInPhase',updateTeamsInPhase);
    socket.on('getQRCodesData', getQRCodesData);
};

module.exports = phasesIo;
