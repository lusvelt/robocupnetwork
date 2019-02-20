const _ = require('lodash');
const Team = require('../../models/Team');
const User = require('../../models/User');
const AgeRange = require('../../models/AgeRange');
const log = require('../../config/consoleMessageConfig');
const TeamHasUser = require('../../database/associationTables/TeamHasUser');

const teamIo = (clientsIo, socket, room) => {

    const createTeam = async (_team, callback) => {
        console.log(_team);
        try {
            const team = await Team.create(_team);
            if (!team)
                throw new Error();   

                let promises = [];
                User.findById(_team.captain.id)
                .then(captain => {
                    promises.push(TeamHasUser.create({teamId: team.id, userId: captain.id, role: 'captain'}));
                })
                
                promises = [];
                _team.members.forEach(member => {        
                    promises.push(TeamHasUser.create({teamId: team.id, userId: member.id, role: 'member'}));              
                });

            const result = await Promise.all(promises);
            if(!result)
                throw new Error();
            callback(team);
            socket.broadcast.emit('createTeam', team);
            log.verbose('Team created');
        } catch (err) {
            callback(new Error());
        }
    };

    const getCaptainFromId = async (_id, callback) => {
        try {
            const promises = [];
            const item = await TeamHasUser.find({where: {teamId: _id, role: 'captain'}})
            
            promises.push(User.findById(item.userId));

            const result = await Promise.all(promises);
            callback(result);
            log.verbose('Captain of team request');
        } catch (err) {
            callback(new Error());
        }
    }

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
    socket.on('getCaptainFromId',getCaptainFromId);
};

module.exports = teamIo;
