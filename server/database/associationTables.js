const RunHasParam = require('./associationTables/RunHasParam');
const ManifestationHasUser = require('./associationTables/ManifestationHasUser.js');
const TeamParticipatesToManifestation = require('./associationTables/TeamParticipatesToManifestation.js');
const PhaseHasField = require('./associationTables/PhaseHasField');
const RunIsArbitratedByReferee = require('./associationTables/RunIsArbitratedByReferee');
const LineupHasTeam = require('./associationTables/LineupHasTeam.js');
const LineupIsInPhase = require('./associationTables/LineupIsInPhase');
const RoleCanDoAction = require('./associationTables/RoleCanDoAction.js');
const ActionIsOfType = require('./associationTables/ActionIsOfType');
const ShiftIncludesLineup = require('./associationTables/ShiftIncludesLineup');
const RunInvolvesLineup = require('./associationTables/RunInvolvesLineup');
const UserHasRoleInManifestation = require('./associationTables/UserHasRoleInManifestation.js');

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
    UserHasRoleInManifestation
};
