const fs = require('fs-extra');
const path = require('path');
const parser = require('xml2json');
const { execSync } = require('child_process');

const rootDir = path.join(__dirname);
const cordovaDir = path.join(__dirname, 'mobileApp');
const publicDir = path.join(__dirname, 'public');
const wwwCordovaDir = path.join(__dirname, 'mobileApp', 'www');
const configXmlPath = path.join(__dirname, 'mobileApp', 'config.xml');
const packagePath = path.join(__dirname, 'package.json');
const appPath = path.join(__dirname, 'mobileApp', 'platforms', 'android', 'app', 'build', 'outputs', 'apk', 'debug', 'app-debug.apk');

const stdio = 'inherit';

const utils = {
    buildMobile: function () {
        fs.removeSync(cordovaDir);
        execSync('cordova create mobileApp com.robocupnetwork.mobile Robocup\\ Network', { cwd: rootDir, stdio }); 
        execSync('cordova platform add browser', { cwd: cordovaDir, stdio });
        execSync('cordova platform add android', { cwd: cordovaDir, stdio });
        execSync('cordova plugin add https://github.com/phonegap/phonegap-plugin-barcodescanner', { cwd: cordovaDir, stdio });
        execSync('cordova plugin add cordova-plugin-app-version', { cwd: cordovaDir, stdio });
        
        if (fs.existsSync(wwwCordovaDir))
            fs.removeSync(wwwCordovaDir);

        execSync('ng build -c mobile --output-path="../mobileApp/www"', { cwd: publicDir, stdio });
    },
    runBrowser: function () {
        this.buildMobile();
        console.log('Application running on browser');
        execSync('cordova run browser', { cwd: cordovaDir, stdio });
    },
    runAndroid: function () {
        this.buildMobile();
        execSync('cordova run android', { cwd: cordovaDir, stdio });
    },
    publish: function (args) {
        if (!args || !args.m)
            return console.log('You must specify a commit message');

        const info = JSON.parse(fs.readFileSync(packagePath, 'utf8'));

        const remotes = execSync('git remote -v', { cwd: rootDir })
            .toString('utf8')
            .split('\n')
            .filter(remote => !!remote)
            .map(remote => remote.split('\t')[0]);
        
        if (!remotes.includes('production'))
            execSync('git remote add production git@robocupnetwork.it:/opt/git/robocupnetwork.git', { cwd: rootDir, stdio });

        if (!args.n) {
            execSync('ng build --prod', { cwd: publicDir, stdio });
            this.buildMobile();
        }
        
        let configXml = fs.readFileSync(configXmlPath).toString('utf8');
        const config = JSON.parse(parser.toJson(configXml, {reversible: true}));
        
        config.widget.description.$t = info.description;
        config.widget.author.email = 'robocup.network@gmail.com';
        config.widget.author.href = 'https://robocupnetwork.it';
        config.widget.author.$t = info.author;

        if (args.v)
            info.mobileAppVersion = args.v;
        else {
            const oldMobileAppVersionArray = info.mobileAppVersion.split('.');
            const lastIndex = oldMobileAppVersionArray.length - 1;
            oldMobileAppVersionArray[lastIndex] = (parseInt(oldMobileAppVersionArray[lastIndex]) + 1).toString();
            info.mobileAppVersion = oldMobileAppVersionArray.join('.');
        }

        config.widget.version = info.mobileAppVersion;
        configXml = parser.toXml(JSON.stringify(config));
        fs.writeFileSync(configXmlPath, configXml);
        
        if (args.t)
            info.version = args.t;
        else {
            const oldVersionArray = info.version.split('.');
            const lastIndex = oldVersionArray.length - 1;
            oldVersionArray[lastIndex] = (parseInt(oldVersionArray[lastIndex]) + 1).toString();
            info.version = oldVersionArray.join('.');
        }
        
        fs.writeFileSync(packagePath, JSON.stringify(info, undefined, 2));

        execSync('git add .', { cwd: rootDir, stdio });
        execSync('git commit -m "' + args.m + '"', { cwd: rootDir, stdio });

        if (args.t)
            execSync('git tag v' + args.t, { cwd: rootDir, stdio });
        
        execSync('git push', { cwd: rootDir, stdio });

        if (args.t)
            execSync('git push --tags', { cwd: rootDir, stdio });

        execSync('git push production', { cwd: rootDir, stdio });
        execSync('scp -r dist git@robocupnetwork.it:/opt/apps/robocupnetwork', { cwd: publicDir, stdio });
        execSync('cordova build android', { cwd: cordovaDir, stdio });
        execSync('scp ' + appPath + ' git@robocupnetwork.it:/opt/apps/robocupnetwork/robocapp.apk', { cwd: publicDir, stdio });
        console.log('Publishing process completed successfully');
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
