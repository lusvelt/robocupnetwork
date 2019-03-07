const login = require('../routes/login');
const register = require('../routes/register');
const appLatestVersion = require('../routes/appLatestVersion');
const robocapp = require('../routes/robocapp');

const router = {
    initialize: (app, passport) => {
        const authenticate = passport.authenticate('jwt', { session: false });

        app.post('/login', login);
        app.post('/register', register);
        
        app.get('/appLatestVersion', appLatestVersion);
        app.get('/robocapp', robocapp);
    }
};

module.exports = router;