const fs = require('fs-extra');
const path = require('path');
const { execSync } = require('child_process');

const rootDir = path.join(__dirname);
const cordovaDir = path.join(__dirname, 'mobileApp');
const publicDir = path.join(__dirname, 'public');
const wwwCordovaDir = path.join(__dirname, 'mobileApp', 'www');

const stdio = 'inherit';

const utils = {
    buildMobile: function () {
        if (!fs.existsSync(cordovaDir)) {
            console.log('Directory \'mobileApp\' does not exist');
            console.log('Initializing cordova project...');
            execSync('cordova create mobileApp', { cwd: rootDir, stdio }); //it.robocupnetwork.mobile Robocup\\ Network
            execSync('cordova platform add browser', { cwd: cordovaDir, stdio });
            execSync('cordova platform add android', { cwd: cordovaDir, stdio });
            console.log('Directory \'mobileApp\' initialized');
            console.log('Adding plugins for cordova...');
            execSync('cordova plugin add https://github.com/phonegap/phonegap-plugin-barcodescanner', { cwd: cordovaDir, stdio });
            console.log('Cordova plugins added successfully');
        }

        console.log('Building Angular application...');
        if (fs.existsSync(wwwCordovaDir))
            fs.removeSync(wwwCordovaDir);

        execSync('ng build -c mobile --output-path="../mobileApp/www"', { cwd: publicDir, stdio });
        console.log('Angular application built successfully');
    },
    runBrowser: function () {
        this.buildMobile();
        console.log('Application running on browser');
        execSync('cordova run browser', { cwd: cordovaDir, stdio });
    },
    publish: function (args) {
        let remotes = execSync('git remote -v', { cwd: rootDir })
            .toString('utf8')
            .split('\n')
            .filter(remote => !!remote)
            .map(remote => remote.split('\t')[0]);
        
        if (!remotes.includes('production')) {
            console.log('Adding production remote to git remotes');
            execSync('git remote add production git@robocupnetwork.it:/opt/git/robocupnetwork.git', { cwd: rootDir, stdio });
            console.log('Remote added successfully');
        }
        
        if (!args.n) {
            console.log('Building Angular application, this may take several time...');
            execSync('ng build --prod', { cwd: publicDir, stdio });
            console.log('Angular application built successfully');
        }

        console.log('Uploading files to GitHub...');
        execSync('git push', { cwd: rootDir, stdio });
        console.log('Push to GitHub done successfully');

        console.log('Uploading files on the server...');
        execSync('git push production', { cwd: rootDir, stdio });
        execSync('scp -r dist git@robocupnetwork.it:/opt/apps/robocupnetwork', { cwd: publicDir, stdio });
        console.log('Files uploaded successfully');
        console.log('You can now access the website at robocupnetwork.it');
    },
    seed: async function () {
        console.log('Adding seed data to database...');
        const database = require('./server/config/database');
        await database.initialize(true);
        console.log('Seed data added successfully');
    }
};

module.exports = utils;
require('make-runnable');
