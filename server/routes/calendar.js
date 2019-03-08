const path = require('path');

const robocapp = async (req, res) => {
    res.sendFile(path.join(__dirname, '..', '..', 'calendar.pdf'));
};

module.exports = robocapp;