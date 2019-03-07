const {
    User,
    ActionType,
    Action,
    Role,
    Manifestation,
    School,
    Place,
    AgeRange,
    Team,
    Category,
    Module,
    Event,
    Phase
} = require('./models');
const TeamHasUser = require('../database/associationTables/TeamHasUser');
const TeamIsInPhase = require('../database/associationTables/TeamIsInPhase');

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
        await ActionType.create({
            name: 'Create',
            alias: 'create'
        }),
        await ActionType.create({
            name: 'Read',
            alias: 'read'
        }),
        await ActionType.create({
            name: 'Update',
            alias: 'update'
        }),
        await ActionType.create({
            name: 'Delete',
            alias: 'delete'
        })
    ];

    const actions = [

        // Utente
        await Action.create({
            name: 'Crea utente',
            alias: 'createUser',
            description: 'Puo\'creare un utente',
            dependsOnManifestation: true
        }),
        await Action.create({
            name: 'Modifica utente',
            alias: 'editUser',
            description: 'Puo\'modificare un utente',
            dependsOnManifestation: true
        }),
        await Action.create({
            name: 'Elimina utente',
            alias: 'deleteUser',
            description: 'Puo\'eliminare un utente',
            dependsOnManifestation: true
        }),

        // Gara
        await Action.create({
            name: 'Visualizza gara',
            alias: 'getRun',
            description: 'Puo\'visualizzare una gara',
            dependsOnManifestation: true
        }),
        await Action.create({
            name: 'Arbitra gara',
            alias: 'arbitrateRun',
            description: 'Puo\'arbitrare una gara',
            dependsOnManifestation: true
        }),
        await Action.create({
            name: 'Valida gara',
            alias: 'validateRun',
            description: 'Puo\'validare una gara mandata dall\'arbitro',
            dependsOnManifestation: true
        }),
        await Action.create({
            name: 'Modifica gara contrassegnata',
            alias: 'editMarkedRun',
            description: 'Puo\'modificare una gara contrassegnata dall\'arbitro',
            dependsOnManifestation: true
        }),
        await Action.create({
            name: 'Cancella gara contrassegnata',
            alias: 'deleteMarkedRun',
            description: 'Puo\'eliminare una gara contrassegnata dall\'arbitro',
            dependsOnManifestation: true
        }),
        await Action.create({
            name: 'Modifica gara',
            alias: 'editRun',
            description: 'Puo\'modificare una gara',
            dependsOnManifestation: true
        }),
        await Action.create({
            name: 'Cancella gara',
            alias: 'deleteRun',
            description: 'Puo\'eliminare una gara',
            dependsOnManifestation: true
        }),

        // Luoghi
        await Action.create({
            name: 'Visualizza luoghi',
            alias: 'getPlaces',
            description: 'Puo\'visualizzare i luoghi',
            dependsOnManifestation: false
        }),
        await Action.create({
            name: 'Crea luogo',
            alias: 'createPlace',
            description: 'Puo\'creare un luogo',
            dependsOnManifestation: true
        }),
        await Action.create({
            name: 'Modifica luogo',
            alias: 'editPlace',
            description: 'Puo\'modificare un luogo',
            dependsOnManifestation: true
        }),
        await Action.create({
            name: 'Elimina luogo',
            alias: 'removePlace',
            description: 'Puo\'eliminare un luogo',
            dependsOnManifestation: true
        }),

        // Categorie
        await Action.create({
            name: 'Visualizza categorie',
            alias: 'getCategories',
            description: 'Puo\'visualizzare le categorie',
            dependsOnManifestation: false
        }),
        await Action.create({
            name: 'Crea categoria',
            alias: 'createCategory',
            description: 'Puo\'creare una categoria',
            dependsOnManifestation: true
        }),
        await Action.create({
            name: 'Modifica categoria',
            alias: 'editCategory',
            description: 'Puo\'modificare una categoria',
            dependsOnManifestation: true
        }),
        await Action.create({
            name: 'Elimina categoria',
            alias: 'removeCategory',
            description: 'Puo\'eliminare una categoria',
            dependsOnManifestation: true
        }),

        // Arbitri
        await Action.create({
            name: 'Visualizza arbitri',
            alias: 'getReferees',
            description: 'Puo\'visualizzare gli arbitri',
            dependsOnManifestation: true
        }),
        await Action.create({
            name: 'Crea arbitro',
            alias: 'assignReferee',
            description: 'Assegna ad un utente i privilegi di arbitro',
            dependsOnManifestation: true
        }),
        await Action.create({
            name: 'Rimuovi arbitro',
            alias: 'removeReferee',
            description: 'Rimuove ad un utente i privlegi di arbitro',
            dependsOnManifestation: true
        }),

        // Gestore gara
        await Action.create({
            name: 'Visualizza aiutanti gestore',
            alias: 'getManifestationManagerHelpers',
            description: 'Puo\'visualizzare gli aiutanti del gestore della manifestazione',
            dependsOnManifestation: true
        }),
        await Action.create({
            name: 'Crea aiutante gestore',
            alias: 'assignManifestationManagerHelpers',
            description: 'Assegna ad un utente i privilegi di aiutanti del gestore della manifestazione',
            dependsOnManifestation: true
        }),
        await Action.create({
            name: 'Rimuovi aiutante gestore',
            alias: 'removeManifestationManagerHelpers',
            description: 'Rimuove ad un utente i privlegi di aiutanti del gestore della manifestazione',
            dependsOnManifestation: true
        }),

        // Validatore gara
        await Action.create({
            name: 'Visualizza validatori gare',
            alias: 'getRunsValidators',
            description: 'Puo\'visualizzare i validatori gare',
            dependsOnManifestation: true
        }),
        await Action.create({
            name: 'Crea validatore gare',
            alias: 'assignRunsValidator',
            description: 'Assegna ad un utente i privilegi di validatore gare',
            dependsOnManifestation: true
        }),
        await Action.create({
            name: 'Rimuovi validatore gare',
            alias: 'removeRunsValidator',
            description: 'Rimuove ad un utente i privlegi di validatore gare',
            dependsOnManifestation: true
        }),

        // Capitano
        await Action.create({
            name: 'Crea Capitano',
            alias: 'assignCaptain',
            description: 'Assegna ad un utente il ruolo di capitano',
            dependsOnManifestation: true
        }),
        await Action.create({
            name: 'Rimuovi Capitano',
            alias: 'removeCaptain',
            description: 'Rimuove ad un utente il ruolo di capitano',
            dependsOnManifestation: true
        }),

        // Vice-capitano
        await Action.create({
            name: 'Crea Vicecapitano',
            alias: 'assignViceCaptain',
            description: 'Assegna ad un utente il ruolo di Vicecapitano',
            dependsOnManifestation: true
        }),
        await Action.create({
            name: 'Rimuovi Capitano',
            alias: 'removeViceCaptain',
            description: 'Rimuove ad un utente il ruolo di Vicecapitano',
            dependsOnManifestation: true
        }),

        // Fascie d'età
        await Action.create({
            name: 'Visualizza fasce di eta',
            alias: 'getAgeRanges',
            description: 'Puo\'visualizzare le fasce di eta',
            dependsOnManifestation: false
        }),
        await Action.create({
            name: 'Crea fascia di eta',
            alias: 'createAgeRange',
            description: 'Puo\'creare una fascia di eta',
            dependsOnManifestation: true
        }),
        await Action.create({
            name: 'Modifica fascia di eta',
            alias: 'editAgeRange',
            description: 'Puo\'modificare una fascia di eta',
            dependsOnManifestation: true
        }),
        await Action.create({
            name: 'Elimina fascia di eta',
            alias: 'removeAgeRange',
            description: 'Puo\'eliminare una fascia di eta',
            dependsOnManifestation: true
        }),

        // Scuole
        await Action.create({
            name: 'Visualizza scuole',
            alias: 'getSchools',
            description: 'Puo\'visualizzare le scuole',
            dependsOnManifestation: false
        }),
        await Action.create({
            name: 'Crea Scuola',
            alias: 'createSchool',
            description: 'Puo\'creare una scuola',
            dependsOnManifestation: true
        }),
        await Action.create({
            name: 'Modifica Scuola',
            alias: 'editSchool',
            description: 'Puo\'modificare una scuola',
            dependsOnManifestation: true
        }),
        await Action.create({
            name: 'Elimina Scuola',
            alias: 'removeSchool',
            description: 'Puo\'eliminare una scuola',
            dependsOnManifestation: true
        }),

        // Fasi
        await Action.create({
            name: 'Visualizza fasi',
            alias: 'getPhases',
            description: 'Puo\'visualizzare una fase',
            dependsOnManifestation: true
        }),
        await Action.create({
            name: 'Crea fase',
            alias: 'createPhase',
            description: 'Puo\'creare una fase',
            dependsOnManifestation: true
        }),
        await Action.create({
            name: 'Modifica fase',
            alias: 'editPhase',
            description: 'Puo\'modificare una fase',
            dependsOnManifestation: true
        }),
        await Action.create({
            name: 'Elimina fase',
            alias: 'removePhase',
            description: 'Puo\'eliminare una fase',
            dependsOnManifestation: true
        }),

        // Manifestazione
        await Action.create({
            name: 'Visualizza utenti in manifestazione',
            alias: 'getUsersInManifestation',
            description: 'Puo\'visualizzare gli utenti in una manifestazione',
            dependsOnManifestation: true
        }),
        await Action.create({
            name: 'Crea utente in manifestazione',
            alias: 'createUserInManifestation',
            description: 'Puo\'creare un utente in una manifestazione',
            dependsOnManifestation: true
        }),
        await Action.create({
            name: 'Modifica utente in manifestazione',
            alias: 'editUserInManifestation',
            description: 'Puo\'modificare un utente in una manifestazione',
            dependsOnManifestation: true
        }),
        await Action.create({
            name: 'Elimina utente in manifestazione',
            alias: 'removeUserInManifestation',
            description: 'Puo\'eliminare un utente in una manifestazione',
            dependsOnManifestation: true
        }),
        await Action.create({
            name: 'Visualizza teams in manifestazione',
            alias: 'getTeamsInManifestation',
            description: 'Puo\'visualizzare le squadre in una manifestazione',
            dependsOnManifestation: true
        }),

    ];

    const roles = [
        await Role.create({
            name: 'Arbitro',
            description: 'Puo\' arbitrare le gare',
            alias: 'referee',
            dependsOnManifestation: true
        }),
        await Role.create({
            name: 'Utente',
            description: 'Utente base',
            alias: 'user',
            dependsOnManifestation: false
        }),
        await Role.create({
            name: 'Validatore gare',
            description: 'Ha il compito di validare le gare',
            alias: 'runsValidator',
            dependsOnManifestation: true
        }),
        await Role.create({
            name: 'Gestore Manifestazione',
            description: 'Ha tutti i privilegi nella sua manifestazione',
            alias: 'manifestationManager',
            dependsOnManifestation: true
        }),
        await Role.create({
            name: 'Aiutante gestore',
            description: 'E\' stato delegato dall\'amministratore. Ha tutti i privilegi nella sua manifestazione',
            alias: 'manifestationManagerHelper',
            dependsOnManifestation: true
        }),
        await Role.create({
            name: 'Capitano',
            description: 'Capitano di una squadra',
            alias: 'captain',
            dependsOnManifestation: true
        }),
        await Role.create({
            name: 'Vice capitano',
            description: 'Vicecapitano di una squadra',
            alias: 'viceCaptain',
            dependsOnManifestation: true
        }),
        await Role.create({
            name: 'Membro squadra',
            description: 'Componente base di una squadra',
            alias: 'teamMember',
            dependsOnManifestation: true
        }),
    ];

    const events = [
        await Event.create({
            name: 'Intersezione',
            description: 'Intersezione in una mattonella',
            pointsJSCalculator: 'this.score += 15;',
            affectsZone: false,
            affectsAttempt: false,
            manuallyTriggerable: true,
            needsStartCountForZones: false,
            triggerOnStart: false,
            waitLastIterationToTrigger: false,
            cancelPendingEvents: false
        }),
        await Event.create({
            name:'Dead end',
            description:'Un intersezione in cui il robot deve invertire il proprio senso di marcia',
            pointsJSCalculator:'this.score += 15;',
            affectsZone: false,
            affectsAttempt: false,
            manuallyTriggerable:true,
            needsStartCountForZones: false,
            triggerOnStart: false,
            waitLastIterationToTrigger: false,
            cancelPendingEvents: false
        }),
        await Event.create({
            name:'Ramp',
            description:'Una salita o una discesa',
            pointsJSCalculator:'this.score += 5;',
            affectsZone: false,
            affectsAttempt: false,
            manuallyTriggerable:true,
            needsStartCountForZones: false,
            triggerOnStart: false,
            waitLastIterationToTrigger: false,
            cancelPendingEvents: false
        }),
        await Event.create({
            name:'Speed bump',
            description:'Un dosso da superare',
            pointsJSCalculator:'this.score += 5;',
            affectsZone: false,
            affectsAttempt: false,
            manuallyTriggerable:true,
            needsStartCountForZones: false,
            triggerOnStart: false,
            waitLastIterationToTrigger: false,
            cancelPendingEvents: false
        }),
        await Event.create({
            name:'Obstacle',
            description:'Un ostacolo da superare',
            pointsJSCalculator:'this.score += 10;',
            affectsZone: false,
            affectsAttempt: false,
            manuallyTriggerable:true,
            needsStartCountForZones: false,
            triggerOnStart: false,
            waitLastIterationToTrigger: false,
            cancelPendingEvents: false
        }),
        await Event.create({
            name:'Gap',
            description:'Un interruzione momentanea della linea',
            pointsJSCalculator:'this.score += 10;',
            affectsZone: false,
            affectsAttempt: false,
            manuallyTriggerable:true,
            needsStartCountForZones: false,
            triggerOnStart: false,
            waitLastIterationToTrigger: false,
            cancelPendingEvents: false
        }),
        await Event.create({
            name:'Lack of progress',
            description:'Nuovo tentativo',
            pointsJSCalculator:'this.lackOfProgress();',
            affectsZone: false,
            affectsAttempt: true,
            manuallyTriggerable:true,
            needsStartCountForZones: false,
            triggerOnStart: false,
            waitLastIterationToTrigger: false,
            cancelPendingEvents: false
        }),
        await Event.create({
            name:'Jump zone',
            description:'La zona non completata viene saltata',
            pointsJSCalculator:'this.nextZone();',
            affectsZone: true,
            affectsAttempt: true,
            manuallyTriggerable:true,
            needsStartCountForZones: false,
            triggerOnStart: false,
            waitLastIterationToTrigger: false,
            cancelPendingEvents: false
        }),
        /*await Event.create({
            name:'Next zone',
            description:'Completata una zona si passa a quella successiva',
            pointsJSCalculator:'this.nextZone();',
            affectsZone: true,
            affectsAttempt: true,
            manuallyTriggerable: false,
            needsStartCountForZones: false,
            triggerOnStart: false,
            waitLastIterationToTrigger: true,
            cancelPendingEvents: false
        }),*/
        await Event.create({
            name:'Checkpoint',
            description:'Viene raggiunto un checkpoint',
            pointsJSCalculator:'this.checkpoint();',
            affectsZone: true,
            affectsAttempt: true,
            manuallyTriggerable: true,
            needsStartCountForZones: false,
            triggerOnStart: false,
            waitLastIterationToTrigger: false,
            cancelPendingEvents: false
        }),
        await Event.create({
            name:'End of play',
            description:'Si verifica quando il robot completa il percorso, oppure quando la squadra dichiara di non voler continuare, oppure allo scadere del tempo ',
            pointsJSCalculator:'this.endOfPlay();',
            affectsZone: false,
            affectsAttempt: false,
            manuallyTriggerable:true,
            needsStartCountForZones: false,
            triggerOnStart: false,
            waitLastIterationToTrigger: false,
            cancelPendingEvents: true
        }),
        await Event.create({
            name:'Living victim',
            description:'Corretta evacuazione di una pallina argentata',
            pointsJSCalculator:'this.livingVictim();',
            affectsZone: false,
            affectsAttempt: false,
            manuallyTriggerable:true,
            needsStartCountForZones: false,
            triggerOnStart: false,
            waitLastIterationToTrigger: false,
            cancelPendingEvents: false
        }),
        await Event.create({
            name:'Dead victim',
            description:'Corretta evacuazione di una pallina nera',
            pointsJSCalculator:'this.deadVictim();',
            affectsZone: false,
            affectsAttempt: false,
            manuallyTriggerable:true,
            needsStartCountForZones: false,
            triggerOnStart: false,
            waitLastIterationToTrigger: false,
            cancelPendingEvents: false
        }),
        await Event.create({
            name:'Exit',
            description:'Il robot è uscito dalla stanza e ha percorso correttamente tre mattonelle, dopo aver toccato o salvato una vittima',
            pointsJSCalculator:'this.score += 20;;',
            affectsZone: false,
            affectsAttempt: false,
            manuallyTriggerable:true,
            needsStartCountForZones: false,
            triggerOnStart: false,
            waitLastIterationToTrigger: false,
            cancelPendingEvents: false
        }),

    ];

    const manifestation = [
        await Manifestation.create({
            name: 'Regionali Abruzzo',
            description: 'Competizione regionale della regione Abruzzo',
            start: new Date('Marzo 08, 2019 08:00:00'),
            end: new Date('Marzo 08, 2019 18:00:00')
        }),
    ];

    const schools = [
        await School.create({
            name: 'I.I.S "A. Volta" Pescara'
        })
    ];

    const places = [
        await Place.create({
            street: 'Via Alessandro Volta',
            civicNumber: '15',
            city: 'Pescara',
            postalCode: '65129',
            province: 'Pescara',
            region: 'Abruzzo',
            country: 'Italia'
        })
    ];

    const ageRanges = [
        await AgeRange.create({
            name: 'under19',
            min: '14',
            max: '18'
        }),
        await AgeRange.create({
            name: 'under14',
            min: '10',
            max: '13'
        })
    ];

    const teams = [
        await Team.create({
            name: 'Fenix'
        })
    ];

    const teamsHasUser = [
        await TeamHasUser.create({
            teamId: teams[0].id,
            userId: users[0].id,
            role: 'captain'
        })
    ];

    const categories = [
        await Category.create({
            name: 'Rescue Line',
            description: 'Seguilinea',
            maxRobotsPerTeam: 1,
            maxTeamsPerLineUp: 1,
            isDividedIntoZones: true,
            checkpointsDetermineZones: true,
            requiresEvacuation: true,
            defaultMaxTime: 480
        })
    ];

    const phase = [
        await Phase.create({
            name: 'Qualificazioni',
            description: 'Qualificazioni per le nazionali.',
            start: new Date('Marzo 08, 2019 08:00:00'),
            end: new Date('Marzo 08, 2019 18:00:00'),
            numAdmittedTeams: 40,
            numPassingTeams: 40
        })
    ]

    const modules = [
        await Module.create({
            name: 'Users',
            alias: 'user'
        }),
        await Module.create({
            name: 'Privileges',
            alias: 'privileges'
        }),
        await Module.create({
            name: 'Manifestations',
            alias: 'manifestation'
        }),
        await Module.create({
            name: 'Places',
            alias: 'places'
        }),
        await Module.create({
            name: 'Categories',
            alias: 'categories'
        }),
        await Module.create({
            name: 'Age Ranges',
            alias: 'ageRanges'
        }),
        await Module.create({
            name: 'Referees',
            alias: 'referees'
        }),
        await Module.create({
            name: 'Schools',
            alias: 'schools'
        }),
        await Module.create({
            name: 'Teams',
            alias: 'teams'
        }),
        await Module.create({
            name: 'Phases',
            alias: 'phases'
        }),
        await Module.create({
            name: 'Runs',
            alias: 'runs'
        }),
        await Module.create({
            name: 'Staff',
            alias: 'staff'
        })
    ];

    await teams[0].addManifestation(manifestation[0]);
    await teams[0].setSchool(schools[0]);
    await teams[0].setAgeRange(ageRanges[0]);

    await schools[0].setPlace(places[0]);

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

    // Arbitro
    await roles[0].addAction(actions[3]);
    await roles[0].addAction(actions[4]);
    await roles[0].addAction(actions[10]);
    await roles[0].addAction(actions[14]);
    await roles[0].addAction(actions[18]);
    await roles[0].addAction(actions[24]);
    await roles[0].addAction(actions[31]);
    await roles[0].addAction(actions[35]);
    await roles[0].addAction(actions[39]);
    await roles[0].addAction(actions[43]);
    await roles[0].addAction(actions[47]);

    // Utente
    /*await roles[1].addAction(actions[3]);
  await roles[1].addAction(actions[10]);
  await roles[1].addAction(actions[14]);
  await roles[1].addAction(actions[19]);
  await roles[1].addAction(actions[31]);
  await roles[1].addAction(actions[35]);
  await roles[1].addAction(actions[39]);
  await roles[1].addAction(actions[43]);
  await roles[1].addAction(actions[47]);*/

    // Validatore gare
    await roles[2].addAction(actions[3]);
    await roles[2].addAction(actions[5]);
    await roles[2].addAction(actions[6]);
    await roles[2].addAction(actions[7]);
    await roles[2].addAction(actions[10]);
    await roles[2].addAction(actions[14]);
    await roles[2].addAction(actions[18]);
    await roles[2].addAction(actions[21]);
    await roles[2].addAction(actions[24]);
    await roles[2].addAction(actions[31]);
    await roles[2].addAction(actions[35]);
    await roles[2].addAction(actions[39]);
    await roles[2].addAction(actions[43]);
    await roles[2].addAction(actions[47]);

    // Gestore manifestazione
    await roles[3].addAction(actions[0]);
    await roles[3].addAction(actions[1]);
    await roles[3].addAction(actions[2]);
    await roles[3].addAction(actions[3]);
    await roles[3].addAction(actions[6]);
    await roles[3].addAction(actions[7]);
    await roles[3].addAction(actions[8]);
    await roles[3].addAction(actions[9]);
    await roles[3].addAction(actions[10]);
    await roles[3].addAction(actions[11]);
    await roles[3].addAction(actions[12]);
    await roles[3].addAction(actions[13]);
    await roles[3].addAction(actions[14]);
    await roles[3].addAction(actions[15]);
    await roles[3].addAction(actions[16]);
    await roles[3].addAction(actions[17]);
    await roles[3].addAction(actions[18]);
    await roles[3].addAction(actions[19]);
    await roles[3].addAction(actions[20]);
    await roles[3].addAction(actions[21]);
    await roles[3].addAction(actions[22]);
    await roles[3].addAction(actions[23]);
    await roles[3].addAction(actions[24]);
    await roles[3].addAction(actions[25]);
    await roles[3].addAction(actions[26]);
    await roles[3].addAction(actions[27]);
    await roles[3].addAction(actions[28]);
    await roles[3].addAction(actions[29]);
    await roles[3].addAction(actions[30]);
    await roles[3].addAction(actions[32]);
    await roles[3].addAction(actions[33]);
    await roles[3].addAction(actions[34]);
    await roles[3].addAction(actions[35]);
    await roles[3].addAction(actions[36]);
    await roles[3].addAction(actions[37]);
    await roles[3].addAction(actions[38]);
    await roles[3].addAction(actions[39]);
    await roles[3].addAction(actions[40]);
    await roles[3].addAction(actions[41]);
    await roles[3].addAction(actions[42]);
    await roles[3].addAction(actions[43]);
    await roles[3].addAction(actions[44]);
    await roles[3].addAction(actions[45]);
    await roles[3].addAction(actions[46]);
    await roles[3].addAction(actions[47]);
    await roles[3].addAction(actions[48]);
    await roles[3].addAction(actions[49]);
    await roles[3].addAction(actions[50]);

    // Aiutatnte gestore
    await roles[4].addAction(actions[0]);
    await roles[4].addAction(actions[1]);
    await roles[4].addAction(actions[2]);
    await roles[4].addAction(actions[3]);
    await roles[4].addAction(actions[6]);
    await roles[4].addAction(actions[7]);
    await roles[4].addAction(actions[8]);
    await roles[4].addAction(actions[9]);
    await roles[4].addAction(actions[10]);
    await roles[4].addAction(actions[11]);
    await roles[4].addAction(actions[12]);
    await roles[4].addAction(actions[13]);
    await roles[4].addAction(actions[14]);
    await roles[4].addAction(actions[15]);
    await roles[4].addAction(actions[16]);
    await roles[4].addAction(actions[17]);
    await roles[4].addAction(actions[18]);
    await roles[4].addAction(actions[19]);
    await roles[4].addAction(actions[20]);
    await roles[4].addAction(actions[21]);
    await roles[4].addAction(actions[24]);
    await roles[4].addAction(actions[25]);
    await roles[4].addAction(actions[26]);
    await roles[4].addAction(actions[27]);
    await roles[4].addAction(actions[28]);
    await roles[4].addAction(actions[29]);
    await roles[4].addAction(actions[30]);
    await roles[4].addAction(actions[32]);
    await roles[4].addAction(actions[33]);
    await roles[4].addAction(actions[34]);
    await roles[4].addAction(actions[35]);
    await roles[4].addAction(actions[36]);
    await roles[4].addAction(actions[37]);
    await roles[4].addAction(actions[38]);
    await roles[4].addAction(actions[39]);
    await roles[4].addAction(actions[40]);
    await roles[4].addAction(actions[41]);
    await roles[4].addAction(actions[42]);
    await roles[4].addAction(actions[43]);
    await roles[4].addAction(actions[44]);
    await roles[4].addAction(actions[45]);
    await roles[4].addAction(actions[46]);
    await roles[4].addAction(actions[47]);
    await roles[4].addAction(actions[48]);
    await roles[4].addAction(actions[49]);
    await roles[4].addAction(actions[50]);

    // Capitano
    await roles[5].addAction(actions[4]);
    await roles[5].addAction(actions[10]);
    await roles[5].addAction(actions[14]);
    await roles[5].addAction(actions[19]);
    await roles[5].addAction(actions[31]);
    await roles[5].addAction(actions[35]);
    await roles[5].addAction(actions[39]);
    await roles[5].addAction(actions[43]);
    await roles[5].addAction(actions[47]);

    // Vice capitano
    await roles[6].addAction(actions[4]);
    await roles[6].addAction(actions[10]);
    await roles[6].addAction(actions[14]);
    await roles[6].addAction(actions[19]);
    await roles[6].addAction(actions[31]);
    await roles[6].addAction(actions[35]);
    await roles[6].addAction(actions[39]);
    await roles[6].addAction(actions[43]);
    await roles[6].addAction(actions[47]);

    // Membro squadra
    await roles[7].addAction(actions[4]);
    await roles[7].addAction(actions[10]);
    await roles[7].addAction(actions[14]);
    await roles[7].addAction(actions[19]);
    await roles[7].addAction(actions[31]);
    await roles[7].addAction(actions[35]);
    await roles[7].addAction(actions[39]);
    await roles[7].addAction(actions[43]);
    await roles[7].addAction(actions[47]);

    await places[0].addManifestation(manifestation[0]);
    await places[0].addManifestation(manifestation[1]);

    await categories[0].addEvent(events[0]);
    await categories[0].addEvent(events[1]);
    await categories[0].addEvent(events[2]);
    await categories[0].addEvent(events[3]);
    await categories[0].addEvent(events[4]);
    await categories[0].addEvent(events[5]);
    await categories[0].addEvent(events[6]);
    await categories[0].addEvent(events[7]);
    await categories[0].addEvent(events[8]);
    await categories[0].addEvent(events[9]);
    await categories[0].addEvent(events[10]);
    await categories[0].addEvent(events[11]);
    await categories[0].addEvent(events[12]);
    await categories[0].addEvent(events[13]);

    // await events[0].addEvent(events[0]);

    await manifestation[0].addPhase(phase[0]);

    await categories[0].addPhase(phase[0]);

    await TeamIsInPhase.create({teamId: teams[0].id, phaseId: phase[0].id})

    /*const competitions = [
      await Competition.create
  ];*/

    // users[0].addCompetition(competitions[0]);
};

module.exports = seed;
