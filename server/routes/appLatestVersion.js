const fs = require('fs');
const path = require('path');
const _ = require('lodash');

const appLatestVersion = async (req, res) => {
    const info = JSON.parse(fs.readFileSync(path.join(__dirname, '..', '..', 'package.json'), 'utf8'));
    res.send(_.pick(info, ['mobileAppVersion']));
};

module.exports = appLatestVersion;