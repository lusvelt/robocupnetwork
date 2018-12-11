const yargs = require('yargs');

yargs.option('reset', {
    alias: 'r',
    default: false
});

module.exports = yargs.argv;