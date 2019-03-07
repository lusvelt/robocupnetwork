const _ = require('lodash');

const Team = require('../../models/Team');
const Phase = require('../../models/Phase');
const Run = require('../../models/Run');
const User = require('../../models/User');
const log = require('../../config/consoleMessageConfig');

const runsIo = (clientsIo, socket, room) => {

    const startRun = async (data, callback) => {
        try {
            const runSettings = data.runSettings;
            const _team = data.team;
            const _referee = data.referee;

            const team = await Team.findById(_team.id);
            const referee = await User.findById(_referee.id);

            runSettings.start = new Date();
            runSettings.zones = JSON.stringify({ zones: runSettings.checkpoints });
            const run = await Run.create(runSettings);
            await run.addUser(referee);
            await run.setTeam(team);

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
    }

    const fastValidateRun = async (run, callback) => {
        try {
            const id = run.id;
            run.status = 'validated';
            run.cardStatus = '';
            const result = Run.update({status: 'validated'}, {where: {id}});
            if(!result)
                throw new Error();
            callback(result);
            socket.broadcast.emit('validateRun', run);
            log.verbose('Run validated');
        } catch {
            callback(new Error());
        }
    }

    const deleteRun = async (run, callback) => {
        try {
            const id = run.id;
            run.status = 'deleted';
            run.cardStatus = '';
            const result = Run.update({status: 'deleted'}, {where: {id}});
            if(!result)
                throw new Error();
            callback(result);
            socket.broadcast.emit('deleteRun', run);
            log.verbose('Run deleted');
        } catch {
            callback(new Error());
        }
    }

    const validateRunWithPoint = async (run, callback) => {
        try {
            const id = run.id;
            run.status = 'validated';
            run.cardStatus = '';
            const result = Run.update({status: 'validated',score: run.score}, {where: {id}});
            if(!result)
                throw new Error();
            callback(result);
            socket.broadcast.emit('validateRun', run);
            log.verbose('Run validated');
        } catch {
            callback(new Error());
        }
    }



    const endRun = async (data, callback) => {
        try {
            const id = data.run.id;
            const _runSettings = data.runSettings;
            const _score = data.score;
            let _events = data.events || [];
            const _toEliminate = data.toEliminate;
            const _isContestation = data.isContestation;
            const contestation = data.contestation;
            let status = 'toBeValidated';

            _events = JSON.stringify({ events: _events });

            if (_toEliminate === true) {
                status = "toBeCanceled";
            } else {
                if (_isContestation === true)
                    status = 'toBeReviewed';
            }    
            
            const result = await Run.update({end: new Date(), status: status, contestationMessage: contestation, score: _score, events: _events}, {where: {id}});      
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


    socket.on('endRun', endRun);
    socket.on('startRun', startRun);
    socket.on('getRuns', getRuns);
    socket.on('fastValidateRun',fastValidateRun);
    socket.on('deleteRun',deleteRun);
    socket.on('validateRunWithPoint',validateRunWithPoint);
};

module.exports = runsIo;
