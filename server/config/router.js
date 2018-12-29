const login = require('../routes/login');
const register = require('../routes/register');
const { getActionTypes, createActionType, editActionType, removeActionType } = require('../routes/privileges');

const router = {
    initialize: (app, passport) => {
        const authenticate = passport.authenticate('jwt', { session: false });

        app.post('/login', login);
        app.post('/register', register);

        app.get('/getActionTypes', getActionTypes);
        app.post('/createActionType', createActionType);
        app.post('/editActionType', editActionType);
        app.post('/removeActionType', removeActionType);
    }
};

module.exports = router;