const fs = require('fs-extra');
const path = require('path');
const { execSync } = require('child_process');

const rootDir = path.join(__dirname);
const cordovaDir = path.join(__dirname, 'mobile');
const publicDir = path.join(__dirname, 'public');
const wwwCordovaDir = path.join(__dirname, 'mobileApp', 'www');

const utils = {
    buildMobile: function () {        
        if (!fs.existsSync(cordovaDir)) {
            console.log('Directory \'mobile\' does not exist');
            console.log('Initializing cordova project...');
            execSync('cordova create mobileApp it.robocupnetwork.mobile Robocup\\ Network', { cwd: rootDir });
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
        
        execSync('ng build --output-path="../mobile/www"', { cwd: publicDir });
        console.log('Angular application built successfully');
    },
    runBrowser: function () {
        this.buildMobile();
        console.log('Application running on browser');
        execSync('cordova run browser', { cwd: cordovaDir });
    }
};

module.exports = utils;
require('make-runnable');