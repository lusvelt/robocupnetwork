const utils = require('./utils');

const {
    Run,
    Param,
    Session,
    Shift,
    Manifestation,
    User,
    Team,
    Phase,
    Field,
    Lineup,
    Role,
    Action,
    ActionType
} = require('./models');

const {
    RunHasParam,
    ManifestationHasUser,
    PhaseHasField,
    TeamParticipatesToManifestation,
    RunIsArbitratedByReferee,
    LineupHasTeam,
    LineupIsInPhase,
    RoleCanDoAction,
    ActionIsOfType,
    ShiftIncludesLineup
} = require('./associationTables');

const runFk = utils.getForeignKey(Run);
const paramFk = utils.getForeignKey(Param);
const sessionFk = utils.getForeignKey(Session);
const manifestationFk = utils.getForeignKey(Manifestation);
const userFk = utils.getForeignKey(User);
const teamFk = utils.getForeignKey(Team);
const phaseFk = utils.getForeignKey(Phase);
const fieldFk = utils.getForeignKey(Field);
const lineupFk = utils.getForeignKey(Lineup);
const roleFK = utils.getForeignKey(Role);
const actionFk = utils.getForeignKey(Action);
const actionTypeFk = utils.getForeignKey(ActionType);
const shiftFk = utils.getForeignKey(Shift);

// EXAMPLE Session - Shift | 1:1
// Session.hasOne(Shift, { foreignKey: sessionFk });

// Session - Shift | 1:N
Session.hasMany(Shift, { foreignKey: sessionFk });

// Run - Param | N:M ('../database/associationTables/RunHasParam.js')
Run.belongsToMany(Param, { through: RunHasParam, foreignKey: runFk });
Param.belongsToMany(Run, { through: RunHasParam, foreignKey: paramFk });

// Manifestation - User | N : M ('../database/associationTables/ManifestationHasUser.js')
Manifestation.belongsToMany(User, { through: ManifestationHasUser, foreignKey: manifestationFk });
User.belongsToMany(Manifestation, { through: ManifestationHasUser, foreignKey: userFk });

// Phase - Field | N:M ('../database/associationTables/PhaseHasField.js')
Phase.belongsToMany(Field, { through: PhaseHasField, foreignKey: phaseFk });
Field.belongsToMany(Phase, { through: PhaseHasField, foreignKey: fieldFk });

// Team - Manifestation | N:M ('../database/associationTables/TeamParticipatesToManifestation.js')
Team.belongsToMany(Manifestation, { through: TeamParticipatesToManifestation, foreignKey: teamFk });
Manifestation.belongsToMany(Team, { through: TeamParticipatesToManifestation, foreignKey: manifestationFk });

// Run - User | N:M ('../database/associationTables/RunIsArbitratedByReferee.js')
Run.belongsToMany(User, { through: RunIsArbitratedByReferee, foreignKey: runFk });
User.belongsToMany(Run, { through: RunIsArbitratedByReferee, foreignKey: userFk });

// Lineup - Team | N:M ('../database/associationTables/LineuoHasTeam.js)
Lineup.belongsToMany(Team, { through: LineupHasTeam, foreignKey: lineupFk });
Team.belongsToMany(Lineup, { through: LineupHasTeam, foreignKey: teamFk });

// Lineup - Phase | N:M ('../database/associationTables/LineupIsInPhase.js')
Lineup.belongsToMany(Phase, { through: LineupIsInPhase, foreignKey: lineupFk });
Phase.belongsToMany(Lineup, { through: LineupIsInPhase, foreignKey: lineupFk });

// Role - Action | N:M ('../database/associationTables/RoleCanDoAction.js)
Role.belongsToMany(Action, { through: RoleCanDoAction, foreignKey: roleFK });
Action.belongsToMany(Role, { through: RoleCanDoAction, foreignKey: actionFk });

// Action - ActionType | N:M ('../database/associationTables/ActionIsOfType.js)
Action.belongsToMany(ActionType, { through: ActionIsOfType, foreignKey: actionFk });
ActionType.belongsToMany(Action, { through: ActionIsOfType, foreignKey: actionTypeFk });

// Shift - Lineup - Field | N:M ('../database/associationTables/ShiftIncludesLineup.js')
/*Shift.belongsToMany(Lineup, { through: ShiftIncludesLineup, foreignKey: shiftFk });
Lineup.belongsToMany(Shift, { through: ShiftIncludesLineup, foreignKey: lineupFk });
ShiftIncludesLineup.hasOne(Field, { foreignKey: fieldFk });*/
