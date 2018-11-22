const { User } = require('./models');

const seed = async () => {
    const users = [
        await User.create({
            name: 'Niccolò',
            surname: 'Bellucci',
            birthDate: new Date(1999, 10, 15),
            email: 'niccolo.bellucci.dev@gmail.com',
            password: 'admin1',
            isAdmin: true
        }),
        await User.create({
            name: 'Stefano',
            surname: 'Colamonaco',
            birthDate: new Date(2000, 1, 7),
            email: 'stefano.colamonaco.dev@gmail.com',
            password: 'admin2',
            isAdmin: true
        }),
        await User.create({
            name: 'Alessio',
            surname: 'Di Pasquale',
            birthDate: new Date(2000, 12, 2),
            email: 'alessio.dipasquale.dev@gmail.com',
            password: 'admin3',
            isAdmin: true
        }),
        await User.create({
            name: 'Damiano',
            surname: 'Scevola',
            birthDate: new Date(1999, 7, 12),
            email: 'damiano.scevolo.dev@gmail.com',
            password: 'admin4',
            isAdmin: true
        })
    ];

    /*const competitions = [
        await Competition.create
    ];*/

    // users[0].addCompetition(competitions[0]);
};

module.exports = seed;
