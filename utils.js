const fs = require('fs-extra');
const path = require('path');
const { execSync } = require('child_process');

const utils = {
    buildMobile: () => {
        const rootDir = path.join(__dirname);
        const cordovaDir = path.join(__dirname, 'mobile');
        const wwwCordovaDir = path.join(__dirname, 'mobile', 'www');
        
        if (!fs.existsSync(cordovaDir)) {
            console.log('Directory \'mobile\' does not exist');
            console.log('Initializing cordova project...');
            execSync('cordova create mobile it.robocupnetwork.mobile Robocup\\ Network', { cwd: rootDir });
            execSync('cordova platform add browser', { cwd: cordovaDir });
            execSync('cordova platform add android', { cwd: cordovaDir });
            console.log('Directory \'mobile\' initialized');
            console.log('Adding plugins for cordova...');
            execSync('cordova plugin add https://github.com/phonegap/phonegap-plugin-barcodescanner', { cwd: cordovaDir });
            console.log('Cordova plugins added successfully');
        }
        
        console.log('Building Angular application...');
        if (fs.existsSync(wwwCordovaDir))
            fs.removeSync(wwwCordovaDir);
        
        execSync('npm run mobile', { cwd: rootDir });
        console.log('Angular application built successfully');
        // execSync('npm run android', { cwd: rootDir });
    }
};

module.exports = utils;
require('make-runnable');