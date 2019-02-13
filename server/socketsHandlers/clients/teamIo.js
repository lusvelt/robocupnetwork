const _ = require('lodash');
const Team = require('../../models/Team');
const AgeRange = require('../../models/AgeRange');
const log = require('../../config/consoleMessageConfig');

const teamIo = (clientsIo, socket, room) => {

    const createTeam = async (_team, callback) => {
        try {
            const team = await Team.create(_team);
            if (!team)
                throw new Error();
            /*const promise = new Promise((resolve, reject) => {
                AgeRange.findById(_team.ageRanges.id)
                    .then(ageRange => team.addAgeRange(ageRange))
                    .then(result => resolve(result))
                    .catch(err => reject(err));
            });

            const result = await Promise.all(promise);
            if(!result)
                throw new Error();*/
            callback(team);
            socket.to(room).broadcast.emit('createTeam', team);
            log.verbose('Team created');
        } catch (err) {
            callback(new Error());
        }
    };

    const getTeams = async (args, callback) => {
        try {
            const team = await Team.getTeamsList();
            callback(team);
            log.verbose('Team data request');
        } catch (err) {
            callback(new Error());
        }
    };

    const editTeam = async (_team, callback) => {
        try {
            const id = _team.id;
            const team = _.omit(_team, ['id']);
            const result = await Team.update(team, {
                where: {
                    id
                }
            });
            if (!result)
                throw new Error();
            callback(result);
            socket.broadcast.emit('editTeam', _team);
            log.verbose('Team modified');
        } catch (err) {
            callback(new Error());
        }
    };

    const removeTeam = async (_team, callback) => {
        try {
            const id = _team.id;
            const result = await Team.destroy({
                where: {
                    id
                }
            });
            if (!result)
                throw new Error();
            callback(result);
            socket.broadcast.emit('removeTeam', _team);
            log.verbose('Team removed');
        } catch (err) {
            callback(new Error());
        }
    };

    socket.on('createTeam', createTeam);
    socket.on('removeTeam', removeTeam);
    socket.on('getTeams', getTeams);
    socket.on('editTeam', editTeam);
};

module.exports = teamIo;
