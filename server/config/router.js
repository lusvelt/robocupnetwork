const login = require('../routes/login');
const register = require('../routes/register');

const router = {
    initialize: (app) => {
        app.post('/login', login);
        app.post('/register', register);
    }
};

module.exports = router;