const login = require('../routes/login');
const register = require('../routes/register');
const appLatestVersion = require('../routes/appLatestVersion');
const robocapp = require('../routes/robocapp');
const calendar = require('../routes/calendar');
const ranking = require('../routes/ranking');

const router = {
    initialize: (app, passport) => {
        const authenticate = passport.authenticate('jwt', { session: false });

        app.post('/login', login);
        app.post('/register', register);

        app.get('/appLatestVersion', appLatestVersion);
        app.get('/robocapp', robocapp);
        app.get('/calendar', calendar);
        app.get('/ranking/:phaseId', ranking);
    }
};

module.exports = router;
