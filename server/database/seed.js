const { User, ActionType, Action, Role, Manifestation, School, Place, AgeRange, Team } = require('./models');

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
            birthDate: new Date(2000, 1, 5),
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
            email: 'scevoladamiano@gmail.com',
            password: 'test1234',
            isAdmin: true
        })
    ];

    const actionTypes = [
        await ActionType.create({ name: 'Create' }),
        await ActionType.create({ name: 'Read' })
        // await ActionType.create({ name: 'Update' }),
        // await ActionType.create({ name: 'Delete' })
    ];

    const action = [
        await Action.create({name:'Annulla gara',description:'test1'}),
        await Action.create({name:'Crea utente',description:'test2'}),
    ];

    const roles = [
        await Role.create({name:'Arbitro gare',description:'test1'}),
        await Role.create({name:'Utente',description:'test2'}),
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

    /*const competitions = [
        await Competition.create
    ];*/

    // users[0].addCompetition(competitions[0]);
};

module.exports = seed;
