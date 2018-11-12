const { User } = require('./models');

const seed = async () => {
    const users = [
        await User.create({
            name: 'Damiano',
            surname: 'Scevola',
            birthDate: new Date(1999, 7, 12),
            email: 'scevoladamiano@gmail.com',
            password: 'test1234',
            isAdmin: true
        })
    ];

    /*const competitions = [
        await Competition.create
    ];*/

    // users[0].addCompetition(competitions[0]);
};

module.exports = seed;