const _ = require('lodash');
const Team = require('../../models/Team');
const User = require('../../models/User');
const Manifestation = require('../../models/Manifestation');
const AgeRange = require('../../models/AgeRange');
const log = require('../../config/consoleMessageConfig');
const TeamHasUser = require('../../database/associationTables/TeamHasUser');
const TeamParticipatesToManifestation = require('../../database/associationTables/TeamParticipatesToManifestation');

const teamIo = (clientsIo, socket, room) => {

    const createTeam = async (data, callback) => {
        const _team = data.team;
        const _manifestation = data.manifestation;
        try {
            const team = await Team.create(_team);
            if (!team)
                throw new Error();

            let promises = [];
            User.findById(_team.captain.id)
                .then(captain => {
                    promises.push(TeamHasUser.create({teamId: team.id, userId: captain.id, role: 'captain'}));
                });

            promises = [];
            _team.members.forEach(member => {
                promises.push(TeamHasUser.create({teamId: team.id, userId: member.id, role: 'member'}));
            });

            promises = [];
            Manifestation.findById(_manifestation.id)
                .then(manifestation => {
                    promises.push(team.addManifestation(manifestation));
                });

            const result = await Promise.all(promises);
            if(!result)
                throw new Error();
            callback(team);
            socket.broadcast.emit('createTeam', {team,_manifestation});
            log.verbose('Team created');
        } catch (err) {
            callback(new Error());
        }
    };

    const getCaptainFromId = async (_id, callback) => {
        try {
            const promises = [];
            const item = await TeamHasUser.find({where: {teamId: _id, role: 'captain'}});

            promises.push(User.findById(item.userId));

            const result = await Promise.all(promises);
            callback(result);
            log.verbose('Captain of team request');
        } catch (err) {
            callback(new Error());
        }
    };

    /*
    const getRolesFromId = async (_userId, callback) => {
        try {
            const promises = [];
            const items = await UserHasRole.findAll({ where: { userId: _userId}});
            items.forEach(item => promises.push(Role.findById(item.roleId)));
            const result = await Promise.all(promises);
            callback(result);
            log.verbose('Basic Roles by id data request');
        } catch (err) {
            callback(new Error());
        }

    };

    */

    const getTeams = async (args, callback) => {
        try {
            const team = await Team.getTeamsList();
            callback(team);
            log.verbose('Team data request');
        } catch (err) {
            callback(new Error());
        }
    };

    const getTeamsInManifestation = async (_manifestation, callback) => {
        try {
            Manifestation.findById(_manifestation.id)
                .then(manifestation => manifestation.getTeams())
                .then(teams => callback(teams));
            log.verbose('Teams in manifestation data request');
        } catch (err) {
            callback(new Error());
        }
    };

    const editTeam = async (data, callback) => {
        try {
            const _team = data.team;
            const _manifestation = data.manifestation;
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
            socket.broadcast.emit('editTeam', {_team, _manifestation});
            log.verbose('Team modified');
        } catch (err) {
            callback(new Error());
        }
    };

    const removeTeam = async (data, callback) => {
        try {
            const _team = data.team;
            const _manifestation = data.manifestation;
            const id = _team.id;
            const result = await Team.destroy({
                where: {
                    id
                }
            });
            if (!result)
                throw new Error();
            callback(result);
            socket.broadcast.emit('removeTeam', {_team,_manifestation});
            log.verbose('Team removed');
        } catch (err) {
            callback(new Error());
        }
    };

    socket.on('createTeam', createTeam);
    socket.on('removeTeam', removeTeam);
    socket.on('getTeams', getTeams);
    socket.on('getTeamsInManifestation', getTeamsInManifestation);
    socket.on('editTeam', editTeam);
    socket.on('getCaptainFromId',getCaptainFromId);
};

module.exports = teamIo;
