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

// Session.hasOne(Shift, { foreignKey: sessionFk });
Category.hasMany(Param, { foreignKey: categoryFk });
Phase.hasOne(Phase, { foreignKey: 'nextPhaseId'});
Category.hasMany(Phase, { foreignKey: categoryFk });
Phase.belongsTo(Category, { foreignKey: categoryFk });
Run.belongsTo(Team, {foreignKey: teamFk});
Run.belongsTo(Phase, {foreignKey: phaseFk});
Phase.hasMany(Run, {foreignKey: phaseFk});
Team.belongsTo(AgeRange, {foreignKey: ageRangeFk});
// AgeRange.hasMany(Team, {foreignKey: ageRangeFk});
Team.belongsTo(School, {foreignKey: schoolFk});
School.hasMany(Team, {foreignKey: schoolFk});
Event.hasMany(Event, { foreignKey: 'triggerId'});
Category.hasMany(Event, { foreignKey: categoryFk });
RobotImage.hasMany(Robot, { foreignKey: robotImageFk });
RobotType.hasMany(Robot, { foreignKey: robotTypeFk });
Team.hasMany(Robot, { foreignKey: teamFk });
School.hasMany(SchoolHasSchoolType, { foreignKey: schoolFk });
SchoolType.hasMany(SchoolHasSchoolType, { schoolTypeFk });
Place.hasMany(Manifestation, { foreignKey: placeFk });
Manifestation.belongsTo(Place, { foreignKey: placeFk });
Manifestation.hasMany(Phase, { foreignKey: manifestationFk });
Phase.belongsTo(Manifestation, { foreignKey: manifestationFk });
// Place.hasMany(School, { foreignKey: placeFk });
School.belongsTo(Place, {foreignKey: placeFk});
Run.belongsTo(Field, { foreignKey: fieldFk });
// Run.belongsTo(Session, { foreignKey: sessionFk });
Run.belongsTo(Occurence, { foreignKey: occurenceFk });
// Occurence.belongsTo(Event, { foreignKey: eventFk });
Occurence.belongsTo(Lineup, { foreignKey: lineupFk });
Session.belongsTo(Phase, { foreignKey: phaseFk });
Session.hasMany(Shift, { foreignKey: sessionFk });

Run.belongsToMany(Param, { through: RunHasParam, foreignKey: runFk });
Param.belongsToMany(Run, { through: RunHasParam, foreignKey: paramFk });

Manifestation.belongsToMany(User, { through: ManifestationHasUser, foreignKey: manifestationFk });
User.belongsToMany(Manifestation, { through: ManifestationHasUser, foreignKey: userFk });

User.belongsToMany(Role, { through: UserHasRole, foreignKey: userFk });
Role.belongsToMany(User, { through: UserHasRole, foreignKey: roleFk });

Phase.belongsToMany(Field, { through: PhaseHasField, foreignKey: phaseFk });
Field.belongsToMany(Phase, { through: PhaseHasField, foreignKey: fieldFk });

Team.belongsToMany(Manifestation, { through: TeamParticipatesToManifestation, foreignKey: teamFk });
Manifestation.belongsToMany(Team, { through: TeamParticipatesToManifestation, foreignKey: manifestationFk });

Run.belongsToMany(User, { through: RunIsArbitratedByReferee, foreignKey: runFk });
User.belongsToMany(Run, { through: RunIsArbitratedByReferee, foreignKey: userFk });

Lineup.belongsToMany(Team, { through: LineupHasTeam, foreignKey: lineupFk });
Team.belongsToMany(Lineup, { through: LineupHasTeam, foreignKey: teamFk });

// Lineup.belongsToMany(Phase, { through: LineupIsInPhase, foreignKey: lineupFk });
// Phase.belongsToMany(Lineup, { through: LineupIsInPhase, foreignKey: lineupFk });

Team.belongsToMany(Phase, { through: TeamIsInPhase, foreignKey: teamFk });
Phase.belongsToMany(Team, { through: TeamIsInPhase, foreignKey: phaseFk });

Role.belongsToMany(Action, { through: RoleCanDoAction, foreignKey: roleFk });
Action.belongsToMany(Role, { through: RoleCanDoAction, foreignKey: actionFk });

Action.belongsToMany(ActionType, { through: ActionIsOfType, foreignKey: actionFk });
ActionType.belongsToMany(Action, { through: ActionIsOfType, foreignKey: actionTypeFk });

Action.belongsToMany(Module, { through: ActionBelongsToModule, foreignKey: actionFk });
Module.belongsToMany(Action, { through: ActionBelongsToModule, foreignKey: moduleFk });

Shift.belongsToMany(Lineup, { through: ShiftIncludesLineup, foreignKey: shiftFk });
Lineup.belongsToMany(Shift, { through: ShiftIncludesLineup, foreignKey: lineupFk });
Field.hasMany(ShiftIncludesLineup, { foreignKey: fieldFk });

Run.belongsToMany(Lineup, { through: RunInvolvesLineup, foreignKey: runFk });
Lineup.belongsToMany(Run, { through: RunInvolvesLineup, foreignKey: lineupFk });
Sign.hasMany(RunInvolvesLineup, { foreignKey: signFk });

User.hasMany(UserHasRoleInManifestation, { foreignKey: userFk });
Role.hasMany(UserHasRoleInManifestation, { foreignKey: roleFk });
Manifestation.hasMany(UserHasRoleInManifestation, { foreignKey: manifestationFk });

Team.belongsToMany(User, { through: TeamHasUser, foreignKey: teamFk });
User.belongsToMany(Team, { through: TeamHasUser, foreignKey: userFk });
Manifestation.hasMany(TeamHasUser, { foreignKey: manifestationFk });
