const utils = require('./utils');

const {
    Run,
    Param,
    Session,
    Shift,
    Manifestation,
    Module,
    User,
    Team,
    Phase,
    Field,
    Lineup,
    Role,
    Action,
    ActionType,
    Sign,
    Place,
    School,
    SchoolType,
    Category,
    Event,
    RobotImage,
    Robot,
    RobotType,
    Occurence,
    AgeRange
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
    ShiftIncludesLineup,
    RunInvolvesLineup,
    UserHasRoleInManifestation,
    TeamHasUser,
    SchoolHasSchoolType,
    ActionBelongsToModule,
    UserHasRole,
    TeamIsInPhase
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
const roleFk = utils.getForeignKey(Role);
const actionFk = utils.getForeignKey(Action);
const actionTypeFk = utils.getForeignKey(ActionType);
const shiftFk = utils.getForeignKey(Shift);
const signFk = utils.getForeignKey(Sign);
const placeFk = utils.getForeignKey(Place);
const schoolFk = utils.getForeignKey(School);
const schoolTypeFk = utils.getForeignKey(SchoolType);
const categoryFk = utils.getForeignKey(Category);
const robotImageFk = utils.getForeignKey(RobotImage);
const robotTypeFk = utils.getForeignKey(RobotType);
const moduleFk = utils.getForeignKey(Module);
const eventFk = utils.getForeignKey(Event);
const occurenceFk = utils.getForeignKey(Occurence);
const ageRangeFk = utils.getForeignKey(AgeRange);

// EXAMPLE Session - Shift | 1:1
// Session.hasOne(Shift, { foreignKey: sessionFk });

// Category - Params | 1:N
Category.hasMany(Param, { foreignKey: categoryFk });

// Phase - Phase | 1:1
Phase.hasOne(Phase, { foreignKey: 'nextPhaseId'});

// Category - Phase | 1:N
Category.hasMany(Phase, { foreignKey: categoryFk });

// Phase - Category | 1:N
Phase.belongsTo(Category, { foreignKey: categoryFk });

// Team - Run | 1:N
Run.belongsTo(Team, {foreignKey: teamFk});

// AgeRange - Team | 1:N
Team.belongsTo(AgeRange, {foreignKey: ageRangeFk});
// AgeRange.hasMany(Team, {foreignKey: ageRangeFk});

// School - Team | 1:N
Team.belongsTo(School, {foreignKey: schoolFk});
// School.hasMany(Team, {foreignKey: schoolFk});

// Event - Event | 1:N
Event.hasMany(Event, { foreignKey: 'triggerId'});

// Event - Category | 1:N
Category.hasMany(Event, { foreignKey: categoryFk });

// Robot - RobotsImage | 1:N
RobotImage.hasMany(Robot, { foreignKey: robotImageFk });

// Robot - RobotType | 1:N
RobotType.hasMany(Robot, { foreignKey: robotTypeFk });

// Robot - TeamPartecipatesToCompetition | 1:N
Team.hasMany(Robot, { foreignKey: teamFk });

// School - SchoolTypes | N:M ('../database/associationTables/SchoolHasSchoolType.js')
School.hasMany(SchoolHasSchoolType, { foreignKey: schoolFk });
SchoolType.hasMany(SchoolHasSchoolType, { schoolTypeFk });

// Place - Manifestation | 1:N
Place.hasMany(Manifestation, { foreignKey: placeFk });
Manifestation.belongsTo(Place, { foreignKey: placeFk });

// Manifestation - Phase | 1:N
Manifestation.hasMany(Phase, { foreignKey: manifestationFk });

// Place - School | 1:N
//Place.hasMany(School, { foreignKey: placeFk });
School.belongsTo(Place, {foreignKey: placeFk});

// Run - Field | 1:N
Run.belongsTo(Field, { foreignKey: fieldFk });

// Run - Session | 1:N
// Run.belongsTo(Session, { foreignKey: sessionFk });

// Occurence - Run 1:1
Run.belongsTo(Occurence, { foreignKey: occurenceFk });

// Occurence - Event 1:N
// Occurence.belongsTo(Event, { foreignKey: eventFk });

// Occurence - Lineup 1:N
Occurence.belongsTo(Lineup, { foreignKey: lineupFk });

// Session - Run 1:N
Session.belongsTo(Phase, { foreignKey: phaseFk });

// Session - Shift | 1:N
Session.hasMany(Shift, { foreignKey: sessionFk });

// Run - Param | N:M ('../database/associationTables/RunHasParam.js')
Run.belongsToMany(Param, { through: RunHasParam, foreignKey: runFk });
Param.belongsToMany(Run, { through: RunHasParam, foreignKey: paramFk });

// Manifestation - User | N:M ('../database/associationTables/ManifestationHasUser.js')
Manifestation.belongsToMany(User, { through: ManifestationHasUser, foreignKey: manifestationFk });
User.belongsToMany(Manifestation, { through: ManifestationHasUser, foreignKey: userFk });

// User - Role | N:M ('../database/associationTables/UserHasRole.js')
User.belongsToMany(Role, { through: UserHasRole, foreignKey: userFk });
Role.belongsToMany(User, { through: UserHasRole, foreignKey: roleFk });

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
// Lineup.belongsToMany(Phase, { through: LineupIsInPhase, foreignKey: lineupFk });
// Phase.belongsToMany(Lineup, { through: LineupIsInPhase, foreignKey: lineupFk });

// Lineup - Phase | N:M ('../database/associationTables/TeamIsInPhase.js')
Team.belongsToMany(Phase, { through: TeamIsInPhase, foreignKey: teamFk });
Phase.belongsToMany(Team, { through: TeamIsInPhase, foreignKey: phaseFk });

// Role - Action | N:M ('../database/associationTables/RoleCanDoAction.js)
Role.belongsToMany(Action, { through: RoleCanDoAction, foreignKey: roleFk });
Action.belongsToMany(Role, { through: RoleCanDoAction, foreignKey: actionFk });

// Action - ActionType | N:M ('../database/associationTables/ActionIsOfType.js)
Action.belongsToMany(ActionType, { through: ActionIsOfType, foreignKey: actionFk });
ActionType.belongsToMany(Action, { through: ActionIsOfType, foreignKey: actionTypeFk });

// Action - Module | N:M ('../database/associationTables/ActionBelongsToModule.js)
Action.belongsToMany(Module, { through: ActionBelongsToModule, foreignKey: actionFk });
Module.belongsToMany(Action, { through: ActionBelongsToModule, foreignKey: moduleFk });

// Shift - Lineup - Field | N:M ('../database/associationTables/ShiftIncludesLineup.js')
Shift.belongsToMany(Lineup, { through: ShiftIncludesLineup, foreignKey: shiftFk });
Lineup.belongsToMany(Shift, { through: ShiftIncludesLineup, foreignKey: lineupFk });
Field.hasMany(ShiftIncludesLineup, { foreignKey: fieldFk });

// Run - Lineup - Sign | N:M ('../database/associationTables/RunInvolvesLineup.js')
Run.belongsToMany(Lineup, { through: RunInvolvesLineup, foreignKey: runFk });
Lineup.belongsToMany(Run, { through: RunInvolvesLineup, foreignKey: lineupFk });
Sign.hasMany(RunInvolvesLineup, { foreignKey: signFk });

// ManifestationHasUser - Role | N:M ('../database/associationTables/UserHasRoleInManifestation.js')
User.hasMany(UserHasRoleInManifestation, { foreignKey: userFk });
Role.hasMany(UserHasRoleInManifestation, { foreignKey: roleFk });
Manifestation.hasMany(UserHasRoleInManifestation, { foreignKey: manifestationFk });

// Team - User - Manifestation | N:M ('../database/associationTables/TeamHasUser.js)
Team.belongsToMany(User, { through: TeamHasUser, foreignKey: teamFk });
User.belongsToMany(Team, { through: TeamHasUser, foreignKey: userFk });
Manifestation.hasMany(TeamHasUser, { foreignKey: manifestationFk });
