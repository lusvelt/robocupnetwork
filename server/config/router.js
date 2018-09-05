const getTest = require('../routes/getTest');
const postTest = require('../routes/postTest');

const router = {
    initialize: (app) => {
        app.get('/test', getTest);
        app.post('/test', postTest);
    }
};

module.exports = router;