const { User, ActionType, Action, Role, Manifestation, School, Place, AgeRange, Team, Category, Module, Event, Phase } = require('./models');
const TeamHasUser = require('../database/associationTables/TeamHasUser');
const TeamIsInPhase = require('../database/associationTables/TeamIsInPhase');

const seed = async () => {
    let users = [
        User.create({
            name: 'Niccolò',
            surname: 'Bellucci',
            birthDate: new Date(1999, 9, 15),
            email: 'niccolo.bellucci.dev@gmail.com',
            password: 'admin1',
            isAdmin: true
        }),
        User.create({
            name: 'Stefano',
            surname: 'Colamonaco',
            birthDate: new Date(2000, 0, 5),
            email: 'stefano.colamonaco.dev@gmail.com',
            password: 'admin2',
            isAdmin: true
        }),
        User.create({
            name: 'Alessio',
            surname: 'Di Pasquale',
            birthDate: new Date(2000, 11, 2),
            email: 'alessio.dipasquale.dev@gmail.com',
            password: 'admin3',
            isAdmin: true
        }),
        User.create({
            name: 'Damiano',
            surname: 'Scevola',
            birthDate: new Date(1999, 7, 12),
            email: 'scevoladamiano@gmail.com',
            password: 'test1234',
            isAdmin: true
        })
    ];

    let actionTypes = [
        ActionType.create({
            name: 'Create',
            alias: 'create'
        }),
        ActionType.create({
            name: 'Read',
            alias: 'read'
        }),
        ActionType.create({
            name: 'Update',
            alias: 'update'
        }),
        ActionType.create({
            name: 'Delete',
            alias: 'delete'
        })
    ];

    let actions = [

        // Utente
        Action.create({
            name: 'Crea utente',
            alias: 'createUser',
            description: 'Puo\'creare un utente',
            dependsOnManifestation: true
        }),
        Action.create({
            name: 'Modifica utente',
            alias: 'editUser',
            description: 'Puo\'modificare un utente',
            dependsOnManifestation: true
        }),
        Action.create({
            name: 'Elimina utente',
            alias: 'removeUser',
            description: 'Puo\'eliminare un utente',
            dependsOnManifestation: true
        }),
        Action.create({
            name: 'Visualizza utenti',
            alias: 'getUsers',
            description: '',
            dependsOnManifestation: false
        }),
        Action.create({
            name: 'Aggiorna data di compleanno',
            alias: 'updateUserBirthdate',
            description: '',
            dependsOnManifestation: false
        }),
        Action.create({
            name: 'Cambia password',
            alias: 'changePassword',
            description: '',
            dependsOnManifestation: false
        }),
        Action.create({
            name: 'Invia utente',
            alias: 'sendUser',
            description: '',
            dependsOnManifestation: false
        }),

        // Gara
        Action.create({
            name: 'Visualizza gare',
            alias: 'getRuns',
            description: 'Puo\'visualizzare una gara',
            dependsOnManifestation: true
        }),
        Action.create({
            name: 'Inizio arbitraggio gara',
            alias: 'startRun',
            description: '',
            dependsOnManifestation: true
        }),
        Action.create({
            name: 'Fine arbitraggio gara',
            alias: 'endRun',
            description: '',
            dependsOnManifestation: true
        }),
        Action.create({
            name: 'Convalida rapida di una gara',
            alias: 'fastValidateRun',
            description: '',
            dependsOnManifestation: true
        }),
        Action.create({
            name: 'Valida gara',
            alias: 'validateRunWithPoint',
            description: 'Puo\'validare una gara mandata dall\'arbitro',
            dependsOnManifestation: true
        }),
        Action.create({
            name: 'Visualizzazione dati per la classifica',
            alias: 'getDataForRanking',
            description: '',
            dependsOnManifestation: true
        }),
        Action.create({
            name: 'Aggiornamento dati in tempo reale',
            alias: 'updateLiveScore',
            description: '',
            dependsOnManifestation: true
        }),
        Action.create({
            name: 'Visualizzazione gare arbitrate per id',
            alias: 'getArbitratedRunsById',
            description: '',
            dependsOnManifestation: true
        }),
        Action.create({
            name: 'Modifica gara',
            alias: 'editRun',
            description: 'Puo\'modificare una gara',
            dependsOnManifestation: true
        }),
        Action.create({
            name: 'Cancella gara',
            alias: 'deleteRun',
            description: 'Puo\'eliminare una gara',
            dependsOnManifestation: true
        }),

        // Luoghi
        Action.create({
            name: 'Visualizza luoghi',
            alias: 'getPlaces',
            description: 'Puo\'visualizzare i luoghi',
            dependsOnManifestation: true
        }),
        Action.create({
            name: 'Crea luogo',
            alias: 'createPlace',
            description: 'Puo\'creare un luogo',
            dependsOnManifestation: true
        }),
        Action.create({
            name: 'Modifica luogo',
            alias: 'editPlace',
            description: 'Puo\'modificare un luogo',
            dependsOnManifestation: true
        }),
        Action.create({
            name: 'Elimina luogo',
            alias: 'removePlace',
            description: 'Puo\'eliminare un luogo',
            dependsOnManifestation: true
        }),

        // Categorie
        Action.create({
            name: 'Visualizza categorie',
            alias: 'getCategories',
            description: 'Puo\'visualizzare le categorie',
            dependsOnManifestation: true
        }),
        Action.create({
            name: 'Crea categoria',
            alias: 'createCategory',
            description: 'Puo\'creare una categoria',
            dependsOnManifestation: true
        }),
        Action.create({
            name: 'Modifica categoria',
            alias: 'editCategory',
            description: 'Puo\'modificare una categoria',
            dependsOnManifestation: true
        }),
        Action.create({
            name: 'Elimina categoria',
            alias: 'removeCategory',
            description: 'Puo\'eliminare una categoria',
            dependsOnManifestation: true
        }),
        Action.create({
            name: 'Ricerca categoria dall\' id della fase',
            alias: 'findCategoryFromPhaseId',
            description: '',
            dependsOnManifestation: true
        }),

        // Arbitri
        Action.create({
            name: 'Visualizza arbitri',
            alias: 'getReferees',
            description: 'Puo\'visualizzare gli arbitri',
            dependsOnManifestation: true
        }),
        Action.create({
            name: 'Crea arbitro',
            alias: 'assignReferee',
            description: 'Assegna ad un utente i privilegi di arbitro',
            dependsOnManifestation: true
        }),
        Action.create({
            name: 'Rimuovi arbitro',
            alias: 'removeReferee',
            description: 'Rimuove ad un utente i privlegi di arbitro',
            dependsOnManifestation: true
        }),

        // Gestore gara
        Action.create({
            name: 'Visualizza aiutanti gestore',
            alias: 'getManifestationManagerHelpers',
            description: 'Puo\'visualizzare gli aiutanti del gestore della manifestazione',
            dependsOnManifestation: true
        }),
        Action.create({
            name: 'Crea aiutante gestore',
            alias: 'assignManifestationManagerHelpers',
            description: 'Assegna ad un utente i privilegi di aiutanti del gestore della manifestazione',
            dependsOnManifestation: true
        }),
        Action.create({
            name: 'Rimuovi aiutante gestore',
            alias: 'removeManifestationManagerHelpers',
            description: 'Rimuove ad un utente i privlegi di aiutanti del gestore della manifestazione',
            dependsOnManifestation: true
        }),

        // Validatore gara
        Action.create({
            name: 'Visualizza validatori gare',
            alias: 'getRunsValidators',
            description: 'Puo\'visualizzare i validatori gare',
            dependsOnManifestation: true
        }),
        Action.create({
            name: 'Crea validatore gare',
            alias: 'assignRunsValidator',
            description: 'Assegna ad un utente i privilegi di validatore gare',
            dependsOnManifestation: true
        }),
        Action.create({
            name: 'Rimuovi validatore gare',
            alias: 'removeRunsValidator',
            description: 'Rimuove ad un utente i privlegi di validatore gare',
            dependsOnManifestation: true
        }),

        // Capitano
        Action.create({
            name: 'Crea Capitano',
            alias: 'assignCaptain',
            description: 'Assegna ad un utente il ruolo di capitano',
            dependsOnManifestation: true
        }),
        Action.create({
            name: 'Rimuovi Capitano',
            alias: 'removeCaptain',
            description: 'Rimuove ad un utente il ruolo di capitano',
            dependsOnManifestation: true
        }),

        // Vice-capitano
        Action.create({
            name: 'Crea Vicecapitano',
            alias: 'assignViceCaptain',
            description: 'Assegna ad un utente il ruolo di Vicecapitano',
            dependsOnManifestation: true
        }),
        Action.create({
            name: 'Rimuovi Capitano',
            alias: 'removeViceCaptain',
            description: 'Rimuove ad un utente il ruolo di Vicecapitano',
            dependsOnManifestation: true
        }),

        // Fascie d'età
        Action.create({
            name: 'Visualizza fasce di eta',
            alias: 'getAgeRanges',
            description: 'Puo\'visualizzare le fasce di eta',
            dependsOnManifestation: true
        }),
        Action.create({
            name: 'Crea fascia di eta',
            alias: 'createAgeRange',
            description: 'Puo\'creare una fascia di eta',
            dependsOnManifestation: true
        }),
        Action.create({
            name: 'Modifica fascia di eta',
            alias: 'editAgeRange',
            description: 'Puo\'modificare una fascia di eta',
            dependsOnManifestation: true
        }),
        Action.create({
            name: 'Elimina fascia di eta',
            alias: 'removeAgeRange',
            description: 'Puo\'eliminare una fascia di eta',
            dependsOnManifestation: true
        }),

        // Scuole
        Action.create({
            name: 'Visualizza scuole',
            alias: 'getSchools',
            description: 'Puo\'visualizzare le scuole',
            dependsOnManifestation: true
        }),
        Action.create({
            name: 'Crea Scuola',
            alias: 'createSchool',
            description: 'Puo\'creare una scuola',
            dependsOnManifestation: true
        }),
        Action.create({
            name: 'Modifica Scuola',
            alias: 'editSchool',
            description: 'Puo\'modificare una scuola',
            dependsOnManifestation: true
        }),
        Action.create({
            name: 'Elimina Scuola',
            alias: 'removeSchool',
            description: 'Puo\'eliminare una scuola',
            dependsOnManifestation: true
        }),
        Action.create({
            name: 'Visualizza luoghi dall\' id',
            alias: 'getPlaceFromId',
            description: '',
            dependsOnManifestation: true
        }),

        // Fasi
        Action.create({
            name: 'Visualizza fasi nella manifestazione',
            alias: 'getPhasesInManifestation',
            description: 'Puo\'visualizzare una fase',
            dependsOnManifestation: true
        }),
        Action.create({
            name: 'Crea fase',
            alias: 'createPhase',
            description: 'Puo\'creare una fase',
            dependsOnManifestation: true
        }),
        Action.create({
            name: 'Modifica fase',
            alias: 'editPhase',
            description: 'Puo\'modificare una fase',
            dependsOnManifestation: true
        }),
        Action.create({
            name: 'Elimina fase',
            alias: 'removePhase',
            description: 'Puo\'eliminare una fase',
            dependsOnManifestation: true
        }),
        Action.create({
            name: 'Aggiorna data fine della fase',
            alias: 'updatePhaseEnd',
            description: '',
            dependsOnManifestation: true
        }),
        Action.create({
            name: 'Aggiorna data inizio della fase',
            alias: 'updatePhaseStart',
            description: '',
            dependsOnManifestation: true
        }),
        Action.create({
            name: 'Visualizza squadre nella fase',
            alias: 'getTeamsInPhase',
            description: '',
            dependsOnManifestation: true
        }),
        Action.create({
            name: 'Aggiorna squadre nella fase',
            alias: 'updateTeamsInPhase',
            description: '',
            dependsOnManifestation: true
        }),
        Action.create({
            name: 'Genera i QRcode',
            alias: 'getQRCodesData',
            description: '',
            dependsOnManifestation: true
        }),

        // Manifestazione
        Action.create({
            name: 'Visualizza utenti in manifestazione',
            alias: 'getUsersInManifestation',
            description: 'Puo\'visualizzare gli utenti in una manifestazione',
            dependsOnManifestation: true
        }),
        Action.create({
            name: 'Crea utente in manifestazione',
            alias: 'createUserInManifestation',
            description: 'Puo\'creare un utente in una manifestazione',
            dependsOnManifestation: true
        }),
        Action.create({
            name: 'Modifica utente in manifestazione',
            alias: 'editUserInManifestation',
            description: 'Puo\'modificare un utente in una manifestazione',
            dependsOnManifestation: true
        }),
        Action.create({
            name: 'Elimina utente in manifestazione',
            alias: 'removeUserInManifestation',
            description: 'Puo\'eliminare un utente in una manifestazione',
            dependsOnManifestation: true
        }),
        Action.create({
            name: 'Visualizza teams in manifestazione',
            alias: 'getTeamsInManifestation',
            description: 'Puo\'visualizzare le squadre in una manifestazione',
            dependsOnManifestation: true
        }),
        Action.create({
            name: 'Crea manifestazione',
            alias: 'createManifestation',
            description: '',
            dependsOnManifestation: true
        }),
        Action.create({
            name: 'Rimuovi manifestazione',
            alias: 'removeManifestation',
            description: '',
            dependsOnManifestation: true
        }),
        Action.create({
            name: 'Visualizza manifestazioni',
            alias: 'getManifestations',
            description: '',
            dependsOnManifestation: true
        }),
        Action.create({
            name: 'Modifica manifestazione',
            alias: 'editManifestation',
            description: '',
            dependsOnManifestation: true
        }),
        Action.create({
            name: 'Aggiorna data inizio manifestazione',
            alias: 'updateStart',
            description: '',
            dependsOnManifestation: true
        }),
        Action.create({
            name: 'Aggiorna data fine manifestazione',
            alias: 'updateEnd',
            description: '',
            dependsOnManifestation: true
        }),

        // Team
        Action.create({
            name: 'Crea squadra',
            alias: 'createTeam',
            description: '',
            dependsOnManifestation: true
        }),
        Action.create({
            name: 'Rimuovi squadra',
            alias: 'removeTeam',
            description: '',
            dependsOnManifestation: true
        }),
        Action.create({
            name: 'Visualizza squadre',
            alias: 'getTeams',
            description: '',
            dependsOnManifestation: true
        }),
        Action.create({
            name: 'Modifica squadra',
            alias: 'editTeam',
            description: '',
            dependsOnManifestation: true
        }),
        Action.create({
            name: 'Ottieni capitano dall\' id',
            alias: 'getCaptainFromId',
            description: '',
            dependsOnManifestation: true
        }),

        // Evento
        Action.create({
            name: 'Crea evento in una categoria',
            alias: 'createEventInCategory',
            description: '',
            dependsOnManifestation: true
        }),
        Action.create({
            name: 'Rimuovi evento',
            alias: 'removeEvent',
            description: '',
            dependsOnManifestation: true
        }),
        Action.create({
            name: 'Ottieni eventi in categoria',
            alias: 'getEventsInCategory',
            description: '',
            dependsOnManifestation: true
        }),
        Action.create({
            name: 'Modifica evento',
            alias: 'editEvent',
            description: '',
            dependsOnManifestation: true
        }),
        Action.create({
            name: 'Aggiorna eventi in evento',
            alias: 'updateEventsInEvent',
            description: '',
            dependsOnManifestation: true
        }),

        // Campo
        Action.create({
            name: 'Ricerca campo dall fase',
            alias: 'findFieldsFromPhaseId',
            description: '',
            dependsOnManifestation: true
        }),
        Action.create({
            name: 'Aggiorna stato del campo',
            alias: 'updateFieldStatus',
            description: '',
            dependsOnManifestation: true
        }),
        Action.create({
            name: 'Fine gara su un campo',
            alias: 'endRunOnField',
            description: '',
            dependsOnManifestation: true
        }),
        Action.create({
            name: 'Aggiorna punteggio su un campo',
            alias: 'updateScoreOnField',
            description: '',
            dependsOnManifestation: true
        }),
        Action.create({
            name: 'Resetta tutti i campi',
            alias: 'resetAllFields',
            description: '',
            dependsOnManifestation: true
        }),

        // Privilegi
    ];

    let roles = [
        Role.create({
            name: 'Arbitro',
            description: 'Puo\' arbitrare le gare',
            alias: 'referee',
            dependsOnManifestation: true
        }),
        Role.create({
            name: 'Utente',
            description: 'Utente base',
            alias: 'user',
            dependsOnManifestation: false
        }),
        Role.create({
            name: 'Validatore gare',
            description: 'Ha il compito di validare le gare',
            alias: 'runsValidator',
            dependsOnManifestation: true
        }),
        Role.create({
            name: 'Aiutante gestore',
            description: 'E\' stato delegato dall\'amministratore. Ha tutti i privilegi nella sua manifestazione',
            alias: 'manifestationManagerHelper',
            dependsOnManifestation: true
        }),
        Role.create({
            name: 'Sorvegliante manifestazione',
            description: 'Visualizza tutti i dati della manifestazione senza però poterli modificare',
            alias: 'supervisor',
            dependsOnManifestation: true
        }),
        Role.create({
            name: 'Capitano',
            description: 'Capitano di una squadra',
            alias: 'captain',
            dependsOnManifestation: true
        }),
        Role.create({
            name: 'Vice capitano',
            description: 'Vicecapitano di una squadra',
            alias: 'viceCaptain',
            dependsOnManifestation: true
        }),
        Role.create({
            name: 'Membro squadra',
            description: 'Componente base di una squadra',
            alias: 'teamMember',
            dependsOnManifestation: true
        }),
        Role.create({
            name: 'Gestore Manifestazione',
            description: 'Ha tutti i privilegi nella sua manifestazione',
            alias: 'manifestationManager',
            dependsOnManifestation: true
        })
    ];

    let events = [
        Event.create({
            name: 'INTERSECTION',
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
        Event.create({
            name: 'DEAD_END',
            description: 'Un intersezione in cui il robot deve invertire il proprio senso di marcia',
            pointsJSCalculator: 'this.score += 15;',
            affectsZone: false,
            affectsAttempt: false,
            manuallyTriggerable: true,
            needsStartCountForZones: false,
            triggerOnStart: false,
            waitLastIterationToTrigger: false,
            cancelPendingEvents: false
        }),
        Event.create({
            name: 'RAMP',
            description: 'Una salita o una discesa',
            pointsJSCalculator: 'this.score += 5;',
            affectsZone: false,
            affectsAttempt: false,
            manuallyTriggerable: true,
            needsStartCountForZones: false,
            triggerOnStart: false,
            waitLastIterationToTrigger: false,
            cancelPendingEvents: false
        }),
        Event.create({
            name: 'SPEED_BUMP',
            description: 'Un dosso da superare',
            pointsJSCalculator: 'this.score += 5;',
            affectsZone: false,
            affectsAttempt: false,
            manuallyTriggerable: true,
            needsStartCountForZones: false,
            triggerOnStart: false,
            waitLastIterationToTrigger: false,
            cancelPendingEvents: false
        }),
        Event.create({
            name: 'OBSTACLE',
            description: 'Un ostacolo da superare',
            pointsJSCalculator: 'this.score += 10;',
            affectsZone: false,
            affectsAttempt: false,
            manuallyTriggerable: true,
            needsStartCountForZones: false,
            triggerOnStart: false,
            waitLastIterationToTrigger: false,
            cancelPendingEvents: false
        }),
        Event.create({
            name: 'GAP',
            description: 'Un interruzione momentanea della linea',
            pointsJSCalculator: 'this.score += 10;',
            affectsZone: false,
            affectsAttempt: false,
            manuallyTriggerable: true,
            needsStartCountForZones: false,
            triggerOnStart: false,
            waitLastIterationToTrigger: false,
            cancelPendingEvents: false
        }),
        Event.create({
            name: 'LACK_OF_PROGRESS',
            description: 'Nuovo tentativo',
            pointsJSCalculator: 'this.lackOfProgress();',
            affectsZone: false,
            affectsAttempt: true,
            manuallyTriggerable: true,
            needsStartCountForZones: false,
            triggerOnStart: false,
            waitLastIterationToTrigger: false,
            cancelPendingEvents: false
        }),
        Event.create({
            name: 'JUMP_ZONE',
            description: 'La zona non completata viene saltata',
            pointsJSCalculator: 'this.nextZone();',
            affectsZone: true,
            affectsAttempt: true,
            manuallyTriggerable: true,
            needsStartCountForZones: false,
            triggerOnStart: false,
            waitLastIterationToTrigger: false,
            cancelPendingEvents: false
        }),
        /* Event.create({
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
        Event.create({
            name: 'Checkpoint',
            description: 'Viene raggiunto un checkpoint',
            pointsJSCalculator: 'this.checkpoint();',
            affectsZone: true,
            affectsAttempt: true,
            manuallyTriggerable: true,
            needsStartCountForZones: false,
            triggerOnStart: false,
            waitLastIterationToTrigger: false,
            cancelPendingEvents: false
        }),
        Event.create({
            name: 'END_OF_PLAY',
            description: 'Si verifica quando il robot completa il percorso, oppure quando la squadra dichiara di non voler continuare, oppure allo scadere del tempo ',
            pointsJSCalculator: 'this.endOfPlay();',
            affectsZone: false,
            affectsAttempt: false,
            manuallyTriggerable: true,
            needsStartCountForZones: false,
            triggerOnStart: false,
            waitLastIterationToTrigger: false,
            cancelPendingEvents: true
        }),
        Event.create({
            name: 'LIVING_VICTIM',
            description: 'Corretta evacuazione di una pallina argentata',
            pointsJSCalculator: 'this.livingVictim();',
            affectsZone: false,
            affectsAttempt: false,
            manuallyTriggerable: true,
            needsStartCountForZones: false,
            triggerOnStart: false,
            waitLastIterationToTrigger: false,
            cancelPendingEvents: false
        }),
        Event.create({
            name: 'DEAD_VICTIM',
            description: 'Corretta evacuazione di una pallina nera',
            pointsJSCalculator: 'this.deadVictim();',
            affectsZone: false,
            affectsAttempt: false,
            manuallyTriggerable: true,
            needsStartCountForZones: false,
            triggerOnStart: false,
            waitLastIterationToTrigger: false,
            cancelPendingEvents: false
        }),
        Event.create({
            name: 'EXIT',
            description: 'Il robot è uscito dalla stanza e ha percorso correttamente tre mattonelle, dopo aver toccato o salvato una vittima',
            pointsJSCalculator: 'this.exit();',
            affectsZone: false,
            affectsAttempt: false,
            manuallyTriggerable: true,
            needsStartCountForZones: false,
            triggerOnStart: false,
            waitLastIterationToTrigger: false,
            cancelPendingEvents: false
        }),

    ];

    let manifestation = [
        Manifestation.create({
            name: 'Regionali Abruzzo',
            description: 'Competizione regionale della regione Abruzzo',
            start: new Date('Marzo 08, 2019 08:00:00'),
            end: new Date('Marzo 08, 2019 18:00:00')
        }),
    ];

    let schools = [
        School.create({
            name: 'I.I.S "A. Volta" Pescara'
        })
    ];

    let places = [
        Place.create({
            street: 'Via Alessandro Volta',
            civicNumber: '15',
            city: 'Pescara',
            postalCode: '65129',
            province: 'Pescara',
            region: 'Abruzzo',
            country: 'Italia'
        })
    ];

    let ageRanges = [
        AgeRange.create({
            name: 'under19',
            min: '14',
            max: '18'
        }),
        AgeRange.create({
            name: 'under14',
            min: '10',
            max: '13'
        })
    ];

    let teams = [];

    let teamsHasUser = [];

    let categories = [
        Category.create({
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

    let phase = [
        Phase.create({
            name: 'Qualificazioni',
            description: 'Qualificazioni per le nazionali.',
            start: new Date('Marzo 08, 2019 08:00:00'),
            end: new Date('Marzo 08, 2019 18:00:00'),
            numAdmittedTeams: 40,
            numPassingTeams: 40
        })
    ];

    let modules = [
        Module.create({
            name: 'Users',
            alias: 'user'
        }),
        Module.create({
            name: 'Privileges',
            alias: 'privileges'
        }),
        Module.create({
            name: 'Manifestations',
            alias: 'manifestation'
        }),
        Module.create({
            name: 'Places',
            alias: 'places'
        }),
        Module.create({
            name: 'Categories',
            alias: 'categories'
        }),
        Module.create({
            name: 'Age Ranges',
            alias: 'ageRanges'
        }),
        Module.create({
            name: 'Referees',
            alias: 'referees'
        }),
        Module.create({
            name: 'Schools',
            alias: 'schools'
        }),
        Module.create({
            name: 'Teams',
            alias: 'teams'
        }),
        Module.create({
            name: 'Phases',
            alias: 'phases'
        }),
        Module.create({
            name: 'Runs',
            alias: 'runs'
        }),
        Module.create({
            name: 'Staff',
            alias: 'staff'
        })
    ];

    users = await Promise.all(users);
    actionTypes = await Promise.all(actionTypes);
    actions = await Promise.all(actions);
    roles = await Promise.all(roles);
    events = await Promise.all(events);
    manifestation = await Promise.all(manifestation);
    schools = await Promise.all(schools);
    places = await Promise.all(places);
    ageRanges = await Promise.all(ageRanges);
    // teams = await Promise.all(teams);
    // teamsHasUser = await Promise.all(teamsHasUser);
    categories = await Promise.all(categories);
    phase = await Promise.all(phase);
    modules = await Promise.all(modules);

    schools[0].setPlace(places[0]);

    actions[0].addActionType(actionTypes[0]);
    actions[1].addActionType(actionTypes[2]);
    actions[2].addActionType(actionTypes[3]);
    actions[3].addActionType(actionTypes[1]);
    actions[4].addActionType(actionTypes[0]);
    actions[5].addActionType(actionTypes[2]);
    actions[6].addActionType(actionTypes[2]);
    actions[7].addActionType(actionTypes[3]);
    actions[8].addActionType(actionTypes[2]);
    actions[9].addActionType(actionTypes[3]);
    actions[10].addActionType(actionTypes[1]);
    actions[11].addActionType(actionTypes[0]);
    actions[12].addActionType(actionTypes[2]);
    actions[13].addActionType(actionTypes[3]);
    actions[14].addActionType(actionTypes[1]);
    actions[15].addActionType(actionTypes[0]);
    actions[16].addActionType(actionTypes[2]);
    actions[17].addActionType(actionTypes[3]);
    actions[18].addActionType(actionTypes[1]);
    actions[19].addActionType(actionTypes[0]);
    actions[20].addActionType(actionTypes[3]);
    actions[21].addActionType(actionTypes[1]);
    actions[22].addActionType(actionTypes[0]);
    actions[23].addActionType(actionTypes[3]);
    actions[24].addActionType(actionTypes[1]);
    actions[25].addActionType(actionTypes[0]);
    actions[26].addActionType(actionTypes[3]);
    actions[27].addActionType(actionTypes[2]);
    actions[28].addActionType(actionTypes[3]);
    actions[29].addActionType(actionTypes[2]);
    actions[30].addActionType(actionTypes[3]);
    actions[31].addActionType(actionTypes[1]);
    actions[32].addActionType(actionTypes[0]);
    actions[33].addActionType(actionTypes[2]);
    actions[34].addActionType(actionTypes[3]);
    actions[35].addActionType(actionTypes[1]);
    actions[36].addActionType(actionTypes[0]);
    actions[37].addActionType(actionTypes[2]);
    actions[38].addActionType(actionTypes[3]);
    actions[39].addActionType(actionTypes[1]);
    actions[40].addActionType(actionTypes[0]);
    actions[41].addActionType(actionTypes[2]);
    actions[42].addActionType(actionTypes[3]);
    actions[43].addActionType(actionTypes[1]);
    actions[44].addActionType(actionTypes[0]);
    actions[45].addActionType(actionTypes[2]);
    actions[46].addActionType(actionTypes[3]);

    // Utenti
    actions[0].addModule(modules[0]);
    actions[1].addModule(modules[0]);
    actions[2].addModule(modules[0]);
    actions[3].addModule(modules[0]);
    actions[4].addModule(modules[0]);
    actions[5].addModule(modules[0]);
    actions[6].addModule(modules[0]);
    actions[57].addModule(modules[0]);
    actions[58].addModule(modules[0]);
    actions[59].addModule(modules[0]);
    actions[60].addModule(modules[0]);

    // Gare
    actions[7].addModule(modules[10]);
    actions[8].addModule(modules[10]);
    actions[9].addModule(modules[10]);
    actions[10].addModule(modules[10]);
    actions[11].addModule(modules[10]);
    actions[15].addModule(modules[10]);
    actions[16].addModule(modules[10]);

    // Luoghi
    actions[17].addModule(modules[3]);
    actions[18].addModule(modules[3]);
    actions[19].addModule(modules[3]);
    actions[20].addModule(modules[3]);
    actions[47].addModule(modules[3]);

    // Arbitri
    actions[14].addModule(modules[6]);
    actions[26].addModule(modules[6]);
    actions[27].addModule(modules[6]);
    actions[28].addModule(modules[6]);

    // Privilegi
    actions[29].addModule(modules[1]);
    actions[30].addModule(modules[1]);
    actions[31].addModule(modules[1]);
    actions[32].addModule(modules[1]);
    actions[33].addModule(modules[1]);
    actions[34].addModule(modules[1]);
    actions[35].addModule(modules[1]);
    actions[36].addModule(modules[1]);
    actions[37].addModule(modules[1]);
    actions[38].addModule(modules[1]);

    // Manifestazioni

    // Categorie
    actions[21].addModule(modules[4]);
    actions[22].addModule(modules[4]);
    actions[23].addModule(modules[4]);
    actions[24].addModule(modules[4]);
    actions[25].addModule(modules[4]);

    // Fascie di età
    actions[39].addModule(modules[5]);
    actions[40].addModule(modules[5]);
    actions[41].addModule(modules[5]);
    actions[42].addModule(modules[5]);

    // Scuole
    actions[43].addModule(modules[7]);
    actions[44].addModule(modules[7]);
    actions[45].addModule(modules[7]);
    actions[46].addModule(modules[7]);

    // Squadre
    actions[54].addModule(modules[8]);
    actions[55].addModule(modules[8]);
    actions[61].addModule(modules[8]);

    // Fasi
    actions[48].addModule(modules[9]);
    actions[49].addModule(modules[9]);
    actions[50].addModule(modules[9]);
    actions[51].addModule(modules[9]);
    actions[52].addModule(modules[9]);
    actions[53].addModule(modules[9]);

    // Staff








    // for (let index = 0; index < actions.length; index++) {
    //     const element = index + ': ' + actions[index].alias;
    //     console.log(element);
    // }

    // for (let index = 0; index < modules.length; index++) {
    //     const element = index + ': ' + modules[index].alias;
    //     console.log(element);
    // }

    //  for (let index = 0; index < actionTypes.length; index++) {
    //     const element = index + ': ' + actionTypes[index].alias;
    //     console.log(element);
    // }

    for (let index = 0; index < roles.length; index++) {
        switch (roles[index].alias) {
        case 'referee':
            // Arbitro
            // console.log(roles[index].alias);
            roles[index].addAction(actions[3]);
            roles[index].addAction(actions[5]);
            roles[index].addAction(actions[7]);
            roles[index].addAction(actions[8]);
            roles[index].addAction(actions[9]);
            roles[index].addAction(actions[12]);
            roles[index].addAction(actions[17]);
            roles[index].addAction(actions[21]);
            roles[index].addAction(actions[32]);
            roles[index].addAction(actions[39]);
            roles[index].addAction(actions[43]);
            roles[index].addAction(actions[64]);
            roles[index].addAction(actions[70]);
            roles[index].addAction(actions[72]);
            break;

        case 'user':
            // Utente
            // console.log(roles[index].alias);
            // roles[index].addAction(actions[3]);
            // roles[index].addAction(actions[10]);
            // roles[index].addAction(actions[14]);
            // roles[index].addAction(actions[18]);
            // roles[index].addAction(actions[21]);
            // roles[index].addAction(actions[24]);
            // roles[index].addAction(actions[31]);
            // roles[index].addAction(actions[35]);
            // roles[index].addAction(actions[39]);
            // roles[index].addAction(actions[43]);
            // roles[index].addAction(actions[47]);
            break;

        case 'runsValidator':
            // Validatore gare
            // console.log(roles[index].alias);
            roles[index].addAction(actions[3]);
            roles[index].addAction(actions[5]);
            roles[index].addAction(actions[7]);
            roles[index].addAction(actions[10]);
            roles[index].addAction(actions[11]);
            roles[index].addAction(actions[12]);
            roles[index].addAction(actions[16]);
            roles[index].addAction(actions[17]);
            roles[index].addAction(actions[21]);
            roles[index].addAction(actions[32]);
            roles[index].addAction(actions[39]);
            roles[index].addAction(actions[43]);
            roles[index].addAction(actions[64]);
            roles[index].addAction(actions[70]);
            roles[index].addAction(actions[72]);
            break;
        case 'manifestationManagerHelper':
            // Aiutatnte gestore
            // console.log(roles[index].alias);
            roles[index].addAction(actions[0]);
            roles[index].addAction(actions[1]);
            roles[index].addAction(actions[2]);
            roles[index].addAction(actions[3]);
            roles[index].addAction(actions[4]);
            roles[index].addAction(actions[5]);
            roles[index].addAction(actions[6]);
            roles[index].addAction(actions[7]);
            roles[index].addAction(actions[12]);
            roles[index].addAction(actions[13]);
            roles[index].addAction(actions[14]);
            roles[index].addAction(actions[15]);
            roles[index].addAction(actions[16]);
            roles[index].addAction(actions[17]);
            roles[index].addAction(actions[18]);
            roles[index].addAction(actions[19]);
            roles[index].addAction(actions[20]);
            roles[index].addAction(actions[21]);
            roles[index].addAction(actions[22]);
            roles[index].addAction(actions[23]);
            roles[index].addAction(actions[24]);
            roles[index].addAction(actions[25]);
            roles[index].addAction(actions[26]);
            roles[index].addAction(actions[27]);
            roles[index].addAction(actions[28]);
            roles[index].addAction(actions[29]);
            roles[index].addAction(actions[32]);
            roles[index].addAction(actions[33]);
            roles[index].addAction(actions[34]);
            roles[index].addAction(actions[35]);
            roles[index].addAction(actions[36]);
            roles[index].addAction(actions[37]);
            roles[index].addAction(actions[38]);
            roles[index].addAction(actions[39]);
            roles[index].addAction(actions[40]);
            roles[index].addAction(actions[41]);
            roles[index].addAction(actions[42]);
            roles[index].addAction(actions[43]);
            roles[index].addAction(actions[44]);
            roles[index].addAction(actions[45]);
            roles[index].addAction(actions[46]);
            roles[index].addAction(actions[47]);
            roles[index].addAction(actions[48]);
            roles[index].addAction(actions[49]);
            roles[index].addAction(actions[50]);
            roles[index].addAction(actions[51]);
            roles[index].addAction(actions[52]);
            roles[index].addAction(actions[53]);
            roles[index].addAction(actions[54]);
            roles[index].addAction(actions[55]);
            roles[index].addAction(actions[56]);
            roles[index].addAction(actions[57]);
            roles[index].addAction(actions[58]);
            roles[index].addAction(actions[59]);
            roles[index].addAction(actions[60]);
            roles[index].addAction(actions[61]);
            roles[index].addAction(actions[62]);
            roles[index].addAction(actions[63]);
            roles[index].addAction(actions[64]);
            roles[index].addAction(actions[65]);
            roles[index].addAction(actions[66]);
            roles[index].addAction(actions[67]);
            roles[index].addAction(actions[68]);
            roles[index].addAction(actions[69]);
            roles[index].addAction(actions[70]);
            roles[index].addAction(actions[71]);
            roles[index].addAction(actions[72]);
            roles[index].addAction(actions[73]);
            roles[index].addAction(actions[74]);
            roles[index].addAction(actions[75]);
            roles[index].addAction(actions[76]);
            roles[index].addAction(actions[77]);
            roles[index].addAction(actions[78]);
            roles[index].addAction(actions[79]);
            roles[index].addAction(actions[80]);
            roles[index].addAction(actions[81]);
            roles[index].addAction(actions[82]);

            break;
        case 'supervisor':
            // Supervisore manifestazione
            // console.log(roles[index].alias);
            // roles[index].addAction(actions[3]);
            // roles[index].addAction(actions[5]);
            // roles[index].addAction(actions[12]);
            // roles[index].addAction(actions[17]);
            // roles[index].addAction(actions[21]);
            // roles[index].addAction(actions[32]);
            // roles[index].addAction(actions[39]);
            // roles[index].addAction(actions[43]);
            // roles[index].addAction(actions[64]);
            // roles[index].addAction(actions[70]);
            // roles[index].addAction(actions[72]);
            break;
        case 'captain':
            // Capitano
            // console.log(roles[index].alias);
            roles[index].addAction(actions[3]);
            roles[index].addAction(actions[5]);
            roles[index].addAction(actions[7]);
            roles[index].addAction(actions[12]);
            roles[index].addAction(actions[17]);
            roles[index].addAction(actions[21]);
            roles[index].addAction(actions[32]);
            roles[index].addAction(actions[39]);
            roles[index].addAction(actions[43]);
            roles[index].addAction(actions[64]);
            roles[index].addAction(actions[70]);
            roles[index].addAction(actions[72]);
            break;
        case 'viceCaptain':
            // Vice capitano
            // console.log(roles[index].alias);
            roles[index].addAction(actions[3]);
            roles[index].addAction(actions[5]);
            roles[index].addAction(actions[7]);
            roles[index].addAction(actions[12]);
            roles[index].addAction(actions[17]);
            roles[index].addAction(actions[21]);
            roles[index].addAction(actions[32]);
            roles[index].addAction(actions[39]);
            roles[index].addAction(actions[43]);
            roles[index].addAction(actions[64]);
            roles[index].addAction(actions[70]);
            roles[index].addAction(actions[72]);
            break;
        case 'teamMember':
            // Membro squadra
            // console.log(roles[index].alias);
            roles[index].addAction(actions[3]);
            roles[index].addAction(actions[5]);
            roles[index].addAction(actions[7]);
            roles[index].addAction(actions[12]);
            roles[index].addAction(actions[17]);
            roles[index].addAction(actions[21]);
            roles[index].addAction(actions[32]);
            roles[index].addAction(actions[39]);
            roles[index].addAction(actions[43]);
            roles[index].addAction(actions[64]);
            roles[index].addAction(actions[70]);
            roles[index].addAction(actions[72]);
            break;
        case 'manifestationManager':
            // Gestore manifestazione
            // console.log(roles[index].alias);
            roles[index].addAction(actions[0]);
            roles[index].addAction(actions[1]);
            roles[index].addAction(actions[2]);
            roles[index].addAction(actions[3]);
            roles[index].addAction(actions[4]);
            roles[index].addAction(actions[5]);
            roles[index].addAction(actions[6]);
            roles[index].addAction(actions[7]);
            roles[index].addAction(actions[12]);
            roles[index].addAction(actions[13]);
            roles[index].addAction(actions[14]);
            roles[index].addAction(actions[15]);
            roles[index].addAction(actions[16]);
            roles[index].addAction(actions[17]);
            roles[index].addAction(actions[18]);
            roles[index].addAction(actions[19]);
            roles[index].addAction(actions[20]);
            roles[index].addAction(actions[21]);
            roles[index].addAction(actions[22]);
            roles[index].addAction(actions[23]);
            roles[index].addAction(actions[24]);
            roles[index].addAction(actions[25]);
            roles[index].addAction(actions[26]);
            roles[index].addAction(actions[27]);
            roles[index].addAction(actions[28]);
            roles[index].addAction(actions[29]);
            roles[index].addAction(actions[30]);
            roles[index].addAction(actions[31]);
            roles[index].addAction(actions[32]);
            roles[index].addAction(actions[33]);
            roles[index].addAction(actions[34]);
            roles[index].addAction(actions[35]);
            roles[index].addAction(actions[36]);
            roles[index].addAction(actions[37]);
            roles[index].addAction(actions[38]);
            roles[index].addAction(actions[39]);
            roles[index].addAction(actions[40]);
            roles[index].addAction(actions[41]);
            roles[index].addAction(actions[42]);
            roles[index].addAction(actions[43]);
            roles[index].addAction(actions[44]);
            roles[index].addAction(actions[45]);
            roles[index].addAction(actions[46]);
            roles[index].addAction(actions[47]);
            roles[index].addAction(actions[48]);
            roles[index].addAction(actions[49]);
            roles[index].addAction(actions[50]);
            roles[index].addAction(actions[51]);
            roles[index].addAction(actions[52]);
            roles[index].addAction(actions[53]);
            roles[index].addAction(actions[54]);
            roles[index].addAction(actions[55]);
            roles[index].addAction(actions[56]);
            roles[index].addAction(actions[57]);
            roles[index].addAction(actions[58]);
            roles[index].addAction(actions[59]);
            roles[index].addAction(actions[60]);
            roles[index].addAction(actions[61]);
            roles[index].addAction(actions[62]);
            roles[index].addAction(actions[63]);
            roles[index].addAction(actions[64]);
            roles[index].addAction(actions[65]);
            roles[index].addAction(actions[66]);
            roles[index].addAction(actions[67]);
            roles[index].addAction(actions[68]);
            roles[index].addAction(actions[69]);
            roles[index].addAction(actions[70]);
            roles[index].addAction(actions[71]);
            roles[index].addAction(actions[72]);
            roles[index].addAction(actions[73]);
            roles[index].addAction(actions[74]);
            roles[index].addAction(actions[75]);
            roles[index].addAction(actions[76]);
            roles[index].addAction(actions[77]);
            roles[index].addAction(actions[78]);
            roles[index].addAction(actions[79]);
            roles[index].addAction(actions[80]);
            roles[index].addAction(actions[81]);
            roles[index].addAction(actions[82]);
            break;
        }
    }




    places[0].addManifestation(manifestation[0]);
    places[0].addManifestation(manifestation[1]);

    categories[0].addEvent(events[0]);
    categories[0].addEvent(events[1]);
    categories[0].addEvent(events[2]);
    categories[0].addEvent(events[3]);
    categories[0].addEvent(events[4]);
    categories[0].addEvent(events[5]);
    categories[0].addEvent(events[6]);
    categories[0].addEvent(events[7]);
    categories[0].addEvent(events[8]);
    categories[0].addEvent(events[9]);
    categories[0].addEvent(events[10]);
    categories[0].addEvent(events[11]);
    categories[0].addEvent(events[12]);
    categories[0].addEvent(events[13]);

    //  events[0].addEvent(events[0]);

    manifestation[0].addPhase(phase[0]);

    categories[0].addPhase(phase[0]);

    /*const competitions = [
       Competition.create
  ];*/

    // users[0].addCompetition(competitions[0]);
};

module.exports = seed;
