const RunHasParam = require('./associationTables/RunHasParam.js');
const ManifestationHasUser = require('./associationTables/ManifestationHasUser.js');
const TeamParticipatesToManifestation = require('./associationTables/TeamParticipatesToManifestation.js');
const PhaseHasField = require('./associationTables/PhaseHasField.js');
const RunIsArbitratedByReferee = require('./associationTables/RunIsArbitratedByReferee.js');
const LineupHasTeam = require('./associationTables/LineupHasTeam.js');
const LineupIsInPhase = require('./associationTables/LineupIsInPhase.js');
const RoleCanDoAction = require('./associationTables/RoleCanDoAction.js');
const ActionIsOfType = require('./associationTables/ActionIsOfType.js');
const ShiftIncludesLineup = require('./associationTables/ShiftIncludesLineup.js');
const RunInvolvesLineup = require('./associationTables/RunInvolvesLineup.js');
const UserHasRoleInManifestation = require('./associationTables/UserHasRoleInManifestation.js');
const TeamHasUser = require('./associationTables/TeamHasUser.js');

module.exports = {
    RunHasParam,
    ManifestationHasUser,
    TeamParticipatesToManifestation,
    PhaseHasField,
    RunIsArbitratedByReferee,
    LineupHasTeam,
    LineupIsInPhase,
    RoleCanDoAction,
    ActionIsOfType,
    ShiftIncludesLineup,
    RunInvolvesLineup,
    UserHasRoleInManifestation,
    TeamHasUser
};
