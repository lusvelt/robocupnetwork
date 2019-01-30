const RunHasParam = require('./associationTables/RunHasParam');
const ManifestationHasUser = require('./associationTables/ManifestationHasUser');
const TeamParticipatesToManifestation = require('./associationTables/TeamParticipatesToManifestation');
const PhaseHasField = require('./associationTables/PhaseHasField');
const RunIsArbitratedByReferee = require('./associationTables/RunIsArbitratedByReferee');
const LineupHasTeam = require('./associationTables/LineupHasTeam');
const LineupIsInPhase = require('./associationTables/LineupIsInPhase');
const RoleCanDoAction = require('./associationTables/RoleCanDoAction');
const ActionIsOfType = require('./associationTables/ActionIsOfType');
const ShiftIncludesLineup = require('./associationTables/ShiftIncludesLineup');
const RunInvolvesLineup = require('./associationTables/RunInvolvesLineup');
const UserHasRoleInManifestation = require('./associationTables/UserHasRoleInManifestation');
const TeamHasUser = require('./associationTables/TeamHasUser');
const SchoolHasSchoolType = require('./associationTables/SchoolHasSchoolType');
const ActionBelongsToModule = require('./associationTables/ActionBelongsToModule');

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
    TeamHasUser,
    SchoolHasSchoolType,
    ActionBelongsToModule
};
