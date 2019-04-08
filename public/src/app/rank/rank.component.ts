import {
  Component,
  OnInit,
  ViewChild
} from '@angular/core';
import {
  AuthService
} from '../services/auth.service';
import {
  DataSource
} from '../classes/data-source.class';
import {
  Subject,
  Observable,
  merge
} from 'rxjs';
import {
  NgbTypeahead
} from '@ng-bootstrap/ng-bootstrap';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  map
} from 'rxjs/operators';
import {
  RunService
} from '../services/run.service';
import {
  NotificationsService
} from '../services/notifications.service';
import { PhasesService } from '../services/phases.service';
import { notAddableConfig } from '../config/tables.config';
import { TablesService } from '../services/tables.service';
import { FieldsService } from '../services/fields.service';

@Component({
  selector: 'ngx-rank',
  templateUrl: './rank.component.html',
  styleUrls: ['./rank.component.scss']
})
export class RankComponent implements OnInit {
  fields: any = [];
  cardStatus: any;
  choose;
  phasesList: [];
  phaseSelected: any;
  source: DataSource = new DataSource();

  @ViewChild('searchPhaseInstance') searchPhaseInstance: NgbTypeahead;
  focus$ = new Subject < string > ();
  click$ = new Subject < string > ();

  phasesFormatter = (value: any) => value.name;

  searchPhase = (text$: Observable < string > ) => {
    const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
    const clicksWithClosedPopup$ = this.click$.pipe(filter(() => !this.searchPhaseInstance.isPopupOpen()));
    const inputFocus$ = this.focus$;

    return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
      map(term => (term === '' ? this.phasesList :
        this.phasesList.filter((v: any) => v.name.toLowerCase().indexOf(term.toLowerCase()) > -1)).slice(0, 10))
    );
  }

  constructor(public authService: AuthService,
    private runService: RunService,
    private notificationsService: NotificationsService,
    private phasesService: PhasesService,
    private tablesService: TablesService,
    private fieldService: FieldsService) {}

  ngOnInit() {
    if (this.authService.isManifestationSelected() && this.authService.canDo('getPhasesInManifestation')) {
      this.phasesService.getPhasesInManifestation()
        .then(phases => {
          this.phasesList = phases;
        })
        .catch(err => this.notificationsService.error('COULD_NOT_LOAD_DATA'));
    }

    this.getNotified();
  }

  onPhaseClicked(event: any) {
    this.phaseSelected = event.item;
    this.getRankingData();
    this.getFieldsData();
  }

  getFieldsData() {
    if (this.authService.canDo('findFieldsFromPhaseId')) {
      this.fieldService.findFieldsFromPhaseId(this.phaseSelected)
            .then(fields => {
              fields.forEach(field => {
                if (field.status === 'free')
                  field.cardStatus = 'success';
                if (field.status === 'running')
                  field.cardStatus = 'warning';
              });
               this.fields = fields;
            });
          } else {
            this.notificationsService.error('UNAUTHORIZED');
          }
  }

  getRankingData() {
    if (this.authService.canDo('getDataForRanking')) {
      this.runService.getDataForRanking(this.phaseSelected)
        .then(data => {
          for (let i = 0; i < data.length; i++) {
            data[i].rank = i + 1;
          }
          this.source.load(data);
          this.source.refresh();
        });
    } else {
      this.notificationsService.error('UNAUTHORIZED');
    }
  }

  getNotified() {
    this.runService.notify('deleteRun')
      .subscribe(run => this.getRankingData());

      this.runService.notify('validateRun')
      .subscribe(run => this.getRankingData());

      this.runService.notify('validateRunWithPoint')
      .subscribe(run => this.getRankingData());

    this.fieldService.notify('updateFieldStatus')
    .subscribe(field => {
      if (field.status === 'free')
        field.cardStatus = 'success';
      if (field.status === 'running')
        field.cardStatus = 'warning';
      this.fields.splice(this.fields.findIndex(el => el.id === field.id), 1, field);
    });

    this.fieldService.notify('endRunOnField')
    .subscribe(field => {
      if (field.status === 'free')
        field.cardStatus = 'success';
      if (field.status === 'running')
        field.cardStatus = 'warning';
      this.fields.splice(this.fields.findIndex(el => el.id === field.id), 1, field);
    });

    this.fieldService.notify('updateScoreOnField')
    .subscribe(field => {
      if (field.status === 'free')
        field.cardStatus = 'success';
      if (field.status === 'running')
        field.cardStatus = 'warning';
      this.fields.splice(this.fields.findIndex(el => el.id === field.id), 1, field);
    });
  }

  settings = this.tablesService.getSettings(notAddableConfig, {
    rank: {
      title: 'RANK',
      type: 'number',
      addable: false,
      editable: false
    },
    team: {
      title: 'TEAM',
      type: 'text',
      addable: false,
      editable: false
    },
    school: {
      title: 'SCHOOL',
      type: 'text',
      addable: false,
      editable: false
    },
    ageRange: {
      title: 'AGE_RANGES',
      type: 'text',
      addable: false,
      editable: false
    },
    score: {
      title: 'SCORE',
      type: 'number',
      addable: false,
      editable: false
    },
    numberOfRuns: {
      title: 'NUMBER_OF_RUNS',
      type: 'number',
      addable: false,
      editable: false
    }
  });
}
