const yargs = require('yargs');

yargs
    .option('reset', {
        alias: 'r',
        default: false
    })
    .option('seed', {
        alias: 's',
        default: false
    })
    .option('debug', {
        alias: 'd',
        default: false
    });

module.exports = yargs.argv;