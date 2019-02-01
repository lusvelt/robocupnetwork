const { User, ActionType, Action, Role, Manifestation, School, Place, AgeRange, Team, Category, Module} = require('./models');

const seed = async () => {
    const users = [
        await User.create({
            name: 'Niccolò',
            surname: 'Bellucci',
            birthDate: new Date(1999, 9, 15),
            email: 'niccolo.bellucci.dev@gmail.com',
            password: 'admin1',
            isAdmin: true
        }),
        await User.create({
            name: 'Stefano',
            surname: 'Colamonaco',
            birthDate: new Date(2000, 0, 5),
            email: 'stefano.colamonaco.dev@gmail.com',
            password: 'admin2',
            isAdmin: true
        }),
        await User.create({
            name: 'Alessio',
            surname: 'Di Pasquale',
            birthDate: new Date(2000, 11, 2),
            email: 'alessio.dipasquale.dev@gmail.com',
            password: 'admin3',
            isAdmin: true
        }),
        await User.create({
            name: 'Damiano',
            surname: 'Scevola',
            birthDate: new Date(1999, 7, 12),
            email: 'scevoladamiano@gmail.com',
            password: 'test1234',
            isAdmin: true
        })
    ];

    const actionTypes = [
        await ActionType.create({ name: 'Create', alias: 'create' }),
        await ActionType.create({ name: 'Read', alias: 'read' })
        // await ActionType.create({ name: 'Update' }),
        // await ActionType.create({ name: 'Delete' })
    ];

    const action = [
        await Action.create({name:'Annulla gara', alias: 'cancelRun', description:'test1'}),
        await Action.create({name:'Crea utente', alias: 'createUser', description:'test2'}),
    ];

    const roles = [
        await Role.create({name:'Arbitro gare',description:'test1',alias:'referee'}),
        await Role.create({name:'Utente',description:'test2',alias:'user'}),
    ];

    const manifestation = [
        await Manifestation.create({name:'Nazionali',description:'ciao', start: new Date(), end: new Date()}),
        await Manifestation.create({name:'Regionali',description:'ciao', start: new Date(), end: new Date()}),
    ];

    const schools = [
        await School.create({name:'Volta'})
    ];

    const places = [
        await Place.create({street:'Via Perna',civicNumber:'4',city:'Sambuceto',postalCode:'66020',province:'Chieti',region:'Abruzzo',country:'Italia'})
    ];

    const ageRanges = [
        await AgeRange.create({name:'under19',min:'14',max:'18'})
    ];

    const teams = [
        await Team.create({name: 'Fenix'})
    ];

    const categories = [
        await Category.create({name: 'Rescue Line', description: 'Seguilinea', maxRobotsPerTeam: 4, maxTeamsPerLineUp: 10, isDividedIntoZones: true, checkpointsDetermineZones: true, requiresEvacuation: true, defaultMaxTime: 300})
    ];

    const modals = [
        await Module.create({name: 'Users',alias: 'user'})
    ];

    /*const competitions = [
        await Competition.create
    ];*/

    // users[0].addCompetition(competitions[0]);
};

module.exports = seed;
