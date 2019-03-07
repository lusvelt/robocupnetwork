const fs = require('fs');
const path = require('path');

const robocapp = async (req, res) => {
    res.sendFile(path.join(__dirname, '..', '..', 'robocapp.apk'));
};

module.exports = robocapp;