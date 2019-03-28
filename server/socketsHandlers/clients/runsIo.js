const _ = require('lodash');
const sequelize = require('../../config/sequelize');
const Team = require('../../models/Team');
const Phase = require('../../models/Phase');
const Run = require('../../models/Run');
const Field = require('../../models/Field');
const User = require('../../models/User');
const log = require('../../config/consoleMessageConfig');
const RunIsArbitratedByReferee = require('../../database/associationTables/RunIsArbitratedByReferee');

const runsIo = (clientsIo, socket, room) => {

    const startRun = async (data, callback) => {
        try {
            const runSettings = data.runSettings;
            const _team = data.team;
            const _referee = data.referee;
            const _phase = _team.Phases[0];

            const team = await Team.findById(_team.id);
            const referee = await User.findById(_referee.id);
            const field = await Field.findById(runSettings.field[0].id);

            runSettings.start = new Date();
            runSettings.zones = JSON.stringify({ zones: runSettings.checkpoints });
            const run = await Run.create(runSettings);
            await run.addUser(referee);
            await run.setTeam(team);

            const phase = await Phase.findById(_phase.id);

            await run.setPhase(phase);
            await run.setField(field);

            const res = await Run.getRunInfo(run.id);
            log.verbose('Run started');
            socket.broadcast.emit('startRun', res);
            callback(run);
        } catch (err) {
            callback(new Error());
        }
    };

    const getRuns = async (args, callback) => {
        try {
            const runs = await Run.getRunsList();
            callback(runs);
            log.verbose('Runs data request');
        } catch (err) {
            callback(new Error());
        }
    };

    const fastValidateRun = async (run, callback) => {
        try {
            const id = run.id;
            run.status = 'validated';
            run.cardStatus = '';
            const result = await Run.update({status: 'validated'}, {where: {id}});
            if(!result)
                throw new Error();
            callback(result);
            socket.broadcast.emit('validateRun', run);
            log.verbose('Run validated');
        } catch (err) {
            callback(new Error());
        }
    };

    const deleteRun = async (run, callback) => {
        try {
            const id = run.id;
            run.status = 'deleted';
            run.cardStatus = '';
            const result = await Run.update({status: 'deleted'}, {where: {id}});
            if(!result)
                throw new Error();
            callback(result);
            socket.broadcast.emit('deleteRun', run);
            log.verbose('Run deleted');
        } catch (err) {
            callback(new Error());
        }
    };

    const validateRunWithPoint = async (run, callback) => {
        try {
            const id = run.id;
            run.status = 'validated';
            run.cardStatus = '';
            const result = await Run.update({status: 'validated',score: run.score}, {where: {id}});
            if(!result)
                throw new Error();
            callback(result);
            socket.broadcast.emit('validateRun', run);
            log.verbose('Run validated');
        } catch (err) {
            callback(new Error());
        }
    };

    const getDataForRanking = async (phase, callback) => {
        try {
            console.log(phase);
            const phaseId = phase.id;
            const ranking = await sequelize.query('SELECT Teams.name as team, Schools.name as school, AgeRanges.name as ageRange, sum(Runs.score) as score, count(Runs.id) as numberOfRuns from  Runs inner join Phases on Runs.phaseId = Phases.id inner join Teams on Runs.teamId = Teams.id inner join Schools on Teams.schoolId = Schools.id inner join AgeRanges on Teams.agerangeId = AgeRanges.id where Phases.id = :phaseId  and Runs.status = \'validated\' group by Teams.id order by score desc;',
                { replacements: { phaseId }, type: sequelize.QueryTypes.SELECT });
            callback(ranking);
            log.verbose('Get data for ranking');
        } catch (err) {
            console.log(err);
            callback(new Error());
        }
    };

    const getArbitratedRunsById = async (user, callback) => {
        try {
            const id = user.id;
            const runs = await RunIsArbitratedByReferee.findAll({where:{userId: id}});
            const promises = [];
            runs.forEach(run => {
                promises.push(Run.getRunInfo(run.runId));
            });
            const result = await Promise.all(promises);
            if (!result)
                throw new Error();
            callback (result);
        } catch (err) {
            callback(new Error());
        }

    };

    const endRun = async (data, callback) => {
        try {
            const id = data.run.id;
            const _runSettings = data.runSettings;
            const _score = data.score;
            let _events = data.events || [];
            const _toEliminate = data.toEliminate;
            const _isContestation = data.isContestation;
            const contestation = data.contestation;
            const _remainingTime = data.remainingTime;
            let status = 'toBeValidated';

            _events = JSON.stringify({ events: _events });

            if (_toEliminate === true) {
                status = 'toBeCanceled';
            } else {
                if (_isContestation === true)
                    status = 'toBeReviewed';
            }

            const result = await Run.update({end: new Date(), status: status, contestationMessage: contestation, score: _score, events: _events, remainingTime: _remainingTime}, {where: {id}});
            if(!result)
                throw new Error();


            const res = await Run.getRunInfo(id);


            callback(res);

            socket.broadcast.emit('endRun', res);
            log.verbose('Run modified');
        } catch (err) {
            console.log(err);
            callback(new Error());
        }
    };

    const updateLiveScore = async (data, callback) => {
        try {
            const run = data.run;
            const score = data.score;
            const id = run.id;

            const result = await Run.update({score: score},{where: {id}});
            if (!result)
                throw new Error();
            callback(result);
            const res = await Run.getRunInfo(id);
            socket.broadcast.emit('updateLiveScore',res);
        } catch (err) {
            callback(new Error());
        }
    };


    socket.on('endRun', endRun);
    socket.on('startRun', startRun);
    socket.on('getRuns', getRuns);
    socket.on('fastValidateRun',fastValidateRun);
    socket.on('deleteRun',deleteRun);
    socket.on('validateRunWithPoint',validateRunWithPoint);
    socket.on('getDataForRanking', getDataForRanking);
    socket.on('updateLiveScore',updateLiveScore);
    socket.on('getArbitratedRunsById', getArbitratedRunsById);
};

module.exports = runsIo;
