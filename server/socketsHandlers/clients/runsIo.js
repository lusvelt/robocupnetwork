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
            log.verbose('Run started');
            callback(run);
        } catch (err) {
            callback(new Error());
        }
    };

    const endRun = async (data, callback) => {
        try {
            console.log(data);
            callback();
        } catch (err) {
            throw(new Error());
        }
    };


    socket.on('endRun', endRun);
    socket.on('startRun', startRun);
};

module.exports = runsIo;
