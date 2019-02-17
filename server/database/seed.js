const { User, ActionType, Action, Role, Manifestation, School, Place, AgeRange, Team, Category, Module } = require('./models');

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
        await ActionType.create({ name: 'Read', alias: 'read' }),
        await ActionType.create({ name: 'Update', alias: 'update' }),
        await ActionType.create({ name: 'Delete', alias: 'delete' })
    ];

    const actions = [
        await Action.create({name:'Crea utente', alias: 'createUser', description:'Puo\'creare un utente',dependsOnManifestation:true}),
        await Action.create({name:'Modifica utente', alias: 'editUser', description:'Puo\'modificare un utente',dependsOnManifestation:true}),
        await Action.create({name:'Elimina utente', alias: 'deleteUser', description:'Puo\'eliminare un utente',dependsOnManifestation:true}),

        await Action.create({name:'Visualizza gara', alias: 'seeRun', description:'Puo\'visualizzare una gara',dependsOnManifestation:true}),
        await Action.create({name:'Arbitra gara', alias: 'arbitrateRun', description:'Puo\'arbitrare una gara',dependsOnManifestation:true}),
        await Action.create({name:'Valida gara', alias: 'validateRun', description:'Puo\'validare una gara mandata dall\'arbitro',dependsOnManifestation:true}),
        await Action.create({name:'Modifica gara contrassegnata', alias: 'editMarkedRun', description:'Puo\'modificare una gara contrassegnata dall\'arbitro',dependsOnManifestation:true}),
        await Action.create({name:'Cancella gara contrassegnata', alias: 'deleteMarkedRun', description:'Puo\'eliminare una gara contrassegnata dall\'arbitro',dependsOnManifestation:true}),
        await Action.create({name:'Modifica gara', alias: 'editRun', description:'Puo\'modificare una gara',dependsOnManifestation:true}),
        await Action.create({name:'Cancella gara', alias: 'deleteRun', description:'Puo\'eliminare una gara',dependsOnManifestation:true}),

        await Action.create({name:'Visualizza luoghi', alias: 'seePlaces', description:'Puo\'visualizzare i luoghi',dependsOnManifestation:true}),
        await Action.create({name:'Crea luogo', alias: 'createPlace', description:'Puo\'creare un luogo',dependsOnManifestation:true}),
        await Action.create({name:'Modifica luogo', alias: 'editPlace', description:'Puo\'modificare un luogo',dependsOnManifestation:true}),
        await Action.create({name:'Elimina luogo', alias: 'deletePlace', description:'Puo\'eliminare un luogo',dependsOnManifestation:true}),

        await Action.create({name:'Visualizza categorie', alias: 'seeCategories', description:'Puo\'visualizzare le categorie',dependsOnManifestation:true}),
        await Action.create({name:'Crea categoria', alias: 'createCategory', description:'Puo\'creare una categoria',dependsOnManifestation:true}),
        await Action.create({name:'Modifica categoria', alias: 'editCategory', description:'Puo\'modificare una categoria',dependsOnManifestation:true}),
        await Action.create({name:'Elimina categoria', alias: 'deleteCategory', description:'Puo\'eliminare una categoria',dependsOnManifestation:true}),
        
        await Action.create({name:'Visualizza arbitri', alias: 'seeReferees', description:'Puo\'visualizzare gli arbitri',dependsOnManifestation:true}),
        await Action.create({name:'Crea arbitro', alias: 'assignReferee', description:'Assegna ad un utente i privilegi di arbitro',dependsOnManifestation:true}),
        await Action.create({name:'Rimuovi arbitro', alias: 'removeReferee', description:'Rimuove ad un utente i privlegi di arbitro',dependsOnManifestation:true}),

        await Action.create({name:'Visualizza aiutanti gestore', alias: 'seeManifestationManagerHelpers', description:'Puo\'visualizzare gli aiutanti del gestore della manifestazione',dependsOnManifestation:true}),
        await Action.create({name:'Crea aiutante gestore', alias: 'assignManifestationManagerHelpers', description:'Assegna ad un utente i privilegi di aiutanti del gestore della manifestazione',dependsOnManifestation:true}),
        await Action.create({name:'Rimuovi aiutante gestore', alias: 'removeManifestationManagerHelpers', description:'Rimuove ad un utente i privlegi di aiutanti del gestore della manifestazione',dependsOnManifestation:true}),

        await Action.create({name:'Visualizza validatori gare', alias: 'seeRunsValidators', description:'Puo\'visualizzare i validatori gare',dependsOnManifestation:true}),
        await Action.create({name:'Crea validatore gare', alias: 'assignRunsValidator', description:'Assegna ad un utente i privilegi di validatore gare',dependsOnManifestation:true}),
        await Action.create({name:'Rimuovi validatore gare', alias: 'removeRunsValidator', description:'Rimuove ad un utente i privlegi di validatore gare',dependsOnManifestation:true}),

        await Action.create({name:'Crea Capitano', alias: 'assignCaptain', description:'Assegna ad un utente il ruolo di capitano',dependsOnManifestation:true}),
        await Action.create({name:'Rimuovi Capitano', alias: 'removeCaptain', description:'Rimuove ad un utente il ruolo di capitano',dependsOnManifestation:true}),

        await Action.create({name:'Crea Vicecapitano', alias: 'assignViceCaptain', description:'Assegna ad un utente il ruolo di Vicecapitano',dependsOnManifestation:true}),
        await Action.create({name:'Rimuovi Capitano', alias: 'removeViceCaptain', description:'Rimuove ad un utente il ruolo di Vicecapitano',dependsOnManifestation:true}),

        await Action.create({name:'Visualizza fasce di eta', alias: 'seeAgeRanges', description:'Puo\'visualizzare le fasce di eta',dependsOnManifestation:true}),
        await Action.create({name:'Crea fascia di eta', alias: 'createAgeRange', description:'Puo\'creare una fascia di eta',dependsOnManifestation:true}),
        await Action.create({name:'Modifica fascia di eta', alias: 'editAgeRange', description:'Puo\'modificare una fascia di eta',dependsOnManifestation:true}),
        await Action.create({name:'Elimina fascia di eta', alias: 'deleteAgeRange', description:'Puo\'eliminare una fascia di eta',dependsOnManifestation:true}),

        await Action.create({name:'Visualizza scuole', alias: 'seeSchools', description:'Puo\'visualizzare le scuole',dependsOnManifestation:true}),
        await Action.create({name:'Crea Scuola', alias: 'createSchool', description:'Puo\'creare una scuola',dependsOnManifestation:true}),
        await Action.create({name:'Modifica Scuola', alias: 'editSchool', description:'Puo\'modificare una scuola',dependsOnManifestation:true}),
        await Action.create({name:'Elimina Scuola', alias: 'deleteSchool', description:'Puo\'eliminare una scuola',dependsOnManifestation:true}),

        await Action.create({name:'Visualizza fasi', alias: 'seePhases', description:'Puo\'visualizzare una fase',dependsOnManifestation:true}),
        await Action.create({name:'Crea fase', alias: 'createPhase', description:'Puo\'creare una fase',dependsOnManifestation:true}),
        await Action.create({name:'Modifica fase', alias: 'editPhase', description:'Puo\'modificare una fase',dependsOnManifestation:true}),
        await Action.create({name:'Elimina fase', alias: 'deletePhase', description:'Puo\'eliminare una fase',dependsOnManifestation:true}),

        await Action.create({name:'Visualizza utenti in manifestazioni', alias: 'seeUsersInManifestation', description:'Puo\'visualizzare gli utenti in una manifestazione',dependsOnManifestation:true}),
        await Action.create({name:'Crea utente in manifestazione', alias: 'createUserInManifestation', description:'Puo\'creare un utente in una manifestazione',dependsOnManifestation:true}),
        await Action.create({name:'Modifica utente in manifestazione', alias: 'editUserInManifestation', description:'Puo\'modificare un utente in una manifestazione',dependsOnManifestation:true}),
        await Action.create({name:'Elimina utente in manifestazione', alias: 'deleteUserInManifestation', description:'Puo\'eliminare un utente in una manifestazione',dependsOnManifestation:true}),
    ];

    const roles = [
        await Role.create({name:'Arbitro', description:'test1',alias:'referee',dependsOnManifestation:true}),
        await Role.create({name:'Utente', description:'test2',alias:'user',dependsOnManifestation:false}),
        await Role.create({name:'Validatore gare', description:'Ha il compito di validare le gare',alias:'runsValidator',dependsOnManifestation:true}),
        await Role.create({name:'Gestore Manifestazione', description:'Ha tutti i privilegi nella sua manifestazione',alias:'manifestationManager',dependsOnManifestation:true}),
        await Role.create({name:'Aiutante gestore', description:'E\' stato delegato dall\'amministratore. Ha tutti i privilegi nella sua manifestazione',alias:'manifestationManagerHelper',dependsOnManifestation:true}),
        await Role.create({name:'Capitano', description:'Capitano di una squadra',alias:'captain',dependsOnManifestation:true}),
        await Role.create({name:'Vice capitano', description:'Vicecapitano di una squadra',alias:'viceCaptain',dependsOnManifestation:true}),
        await Role.create({name:'Membro squadra', description:'Componente base di una squadra',alias:'teamMember',dependsOnManifestation:true}),
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

    const modules = [
        await Module.create({ name: 'Users',alias: 'user' }),
        await Module.create({ name: 'Privileges', alias: 'privileges' }),
        await Module.create({ name: 'Manifestations', alias: 'manifestation' }),
        await Module.create({ name: 'Places', alias: 'places' }),
        await Module.create({ name: 'Categories', alias: 'categories' }),
        await Module.create({ name: 'Age Ranges', alias: 'ageRanges' }),
        await Module.create({ name: 'Referees', alias: 'referees' }),
        await Module.create({ name: 'Schools', alias: 'schools' }),
        await Module.create({ name: 'Teams', alias: 'teams' }),
        await Module.create({ name: 'Phases', alias: 'phases' }),
        await Module.create({ name: 'Runs', alias: 'runs' }),
        await Module.create({ name: 'Staff', alias: 'staff' })
    ];



    await actions[0].addActionType(actionTypes[0]);
    await actions[1].addActionType(actionTypes[2]);
    await actions[2].addActionType(actionTypes[3]);
    await actions[3].addActionType(actionTypes[1]);       
    await actions[4].addActionType(actionTypes[0]);       
    await actions[5].addActionType(actionTypes[2]);
    await actions[6].addActionType(actionTypes[2]);
    await actions[7].addActionType(actionTypes[3]);
    await actions[8].addActionType(actionTypes[2]);
    await actions[9].addActionType(actionTypes[3]);
    await actions[10].addActionType(actionTypes[1]);
    await actions[11].addActionType(actionTypes[0]);
    await actions[12].addActionType(actionTypes[2]);
    await actions[13].addActionType(actionTypes[3]);
    await actions[14].addActionType(actionTypes[1]);
    await actions[15].addActionType(actionTypes[0]);
    await actions[16].addActionType(actionTypes[2]);
    await actions[17].addActionType(actionTypes[3]);
    await actions[18].addActionType(actionTypes[1]);
    await actions[19].addActionType(actionTypes[0]);
    await actions[20].addActionType(actionTypes[3]);
    await actions[21].addActionType(actionTypes[1]);
    await actions[22].addActionType(actionTypes[0]);
    await actions[23].addActionType(actionTypes[3]);
    await actions[24].addActionType(actionTypes[1]);
    await actions[25].addActionType(actionTypes[0]);
    await actions[26].addActionType(actionTypes[3]);
    await actions[27].addActionType(actionTypes[2]);
    await actions[28].addActionType(actionTypes[3]);
    await actions[29].addActionType(actionTypes[2]);
    await actions[30].addActionType(actionTypes[3]);
    await actions[31].addActionType(actionTypes[1]);
    await actions[32].addActionType(actionTypes[0]);
    await actions[33].addActionType(actionTypes[2]);
    await actions[34].addActionType(actionTypes[3]);
    await actions[35].addActionType(actionTypes[1]);
    await actions[36].addActionType(actionTypes[0]);
    await actions[37].addActionType(actionTypes[2]);
    await actions[38].addActionType(actionTypes[3]);
    await actions[39].addActionType(actionTypes[1]);
    await actions[40].addActionType(actionTypes[0]);
    await actions[41].addActionType(actionTypes[2]);
    await actions[42].addActionType(actionTypes[3]);
    await actions[43].addActionType(actionTypes[1]);
    await actions[44].addActionType(actionTypes[0]);
    await actions[45].addActionType(actionTypes[2]);
    await actions[46].addActionType(actionTypes[3]);


    await actions[0].addModule(modules[0]);
    await actions[1].addModule(modules[0]);
    await actions[2].addModule(modules[0]);
    await actions[3].addModule(modules[10]);       
    await actions[4].addModule(modules[10]);       
    await actions[5].addModule(modules[10]);
    await actions[6].addModule(modules[10]);
    await actions[7].addModule(modules[10]);
    await actions[8].addModule(modules[10]);
    await actions[9].addModule(modules[10]);
    await actions[10].addModule(modules[3]);
    await actions[11].addModule(modules[3]);
    await actions[12].addModule(modules[3]);
    await actions[13].addModule(modules[3]);
    await actions[14].addModule(modules[4]);
    await actions[15].addModule(modules[4]);
    await actions[16].addModule(modules[4]);
    await actions[17].addModule(modules[4]);
    await actions[18].addModule(modules[6]);
    await actions[19].addModule(modules[6]);
    await actions[20].addModule(modules[6]);
    await actions[21].addModule(modules[11]);
    await actions[22].addModule(modules[11]);
    await actions[23].addModule(modules[11]);
    await actions[24].addModule(modules[11]);
    await actions[25].addModule(modules[11]);
    await actions[26].addModule(modules[11]);
    await actions[27].addModule(modules[8]);
    await actions[28].addModule(modules[8]);
    await actions[29].addModule(modules[8]);
    await actions[30].addModule(modules[8]);
    await actions[31].addModule(modules[5]);
    await actions[32].addModule(modules[5]);
    await actions[33].addModule(modules[5]);
    await actions[34].addModule(modules[5]);
    await actions[35].addModule(modules[7]);
    await actions[36].addModule(modules[7]);
    await actions[37].addModule(modules[7]);
    await actions[38].addModule(modules[7]);
    await actions[39].addModule(modules[9]);
    await actions[40].addModule(modules[9]);
    await actions[41].addModule(modules[9]);
    await actions[42].addModule(modules[9]);
    await actions[43].addModule(modules[0]);
    await actions[44].addModule(modules[0]);
    await actions[45].addModule(modules[0]);
    await actions[46].addModule(modules[0]);
    

    /*const competitions = [
        await Competition.create
    ];*/

    // users[0].addCompetition(competitions[0]);
};

module.exports = seed;
