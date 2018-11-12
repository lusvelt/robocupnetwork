const utils = require('./utils');
const { Run, Param, Session, Shift } = require('./models');
const { RunHasParam } = require('./associationTables');

const runFk = utils.getForeignKey(Run);
const paramFk = utils.getForeignKey(Param);
const sessionFk = utils.getForeignKey(Session);

// EXAMPLE Session - Shift: 1 - 1
// Session.hasOne(Shift, { foreignKey: sessionFk });

// Session - Shift: 1 - N
Session.hasMany(Shift, { foreignKey: sessionFk });

// Run - Param: N - M
Run.belongsToMany(Param, { through: RunHasParam, foreignKey: runFk });
Param.belongsToMany(Run, { through: RunHasParam, foreignKey: paramFk });
