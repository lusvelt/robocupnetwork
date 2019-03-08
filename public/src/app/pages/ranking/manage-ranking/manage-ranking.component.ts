import { TablesService } from '../../../services/tables.service';
import { notAddableConfig } from '../../../config/tables.config';
import { DataSource } from '../../../classes/data-source.class';
import { PhasesService } from './../../../services/phases.service';
import { Component, OnDestroy, ViewChild, OnInit } from '@angular/core';
import { takeWhile, debounceTime, distinctUntilChanged, filter, map } from 'rxjs/operators' ;
import { Subject } from 'rxjs/Subject';
import { NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../../../services/auth.service';
import { merge, Observable } from 'rxjs';
import { NotificationsService } from '../../../services/notifications.service';
import { RunService } from '../../../services/run.service';

@Component({
  selector: 'ngx-manage-ranking',
  templateUrl: './manage-ranking.component.html',
  styleUrls: ['./manage-ranking.component.scss']
})
export class ManageRankingComponent implements OnInit {

  phasesList: [];
  phaseSelected: any;
  source: DataSource = new DataSource();

  @ViewChild('searchPhaseInstance') searchPhaseInstance: NgbTypeahead;
  focus$ = new Subject<string>();
  click$ = new Subject<string>();

  phasesFormatter = (value: any) => value.name;

  searchPhase = (text$: Observable<string>) => {
    const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
    const clicksWithClosedPopup$ = this.click$.pipe(filter(() => !this.searchPhaseInstance.isPopupOpen()));
    const inputFocus$ = this.focus$;

    return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
      map(term => (term === '' ? this.phasesList
        : this.phasesList.filter((v: any) => v.name.toLowerCase().indexOf(term.toLowerCase()) > -1)).slice(0, 10))
    );
  }

  constructor(private tablesService: TablesService,
              public authService: AuthService,
              private phasesService: PhasesService,
              private notificationsService: NotificationsService,
              private runService: RunService) { }

  ngOnInit() {
    if (this.authService.isManifestationSelected() && this.authService.canDo('getPhasesInManifestation')) {
      this.phasesService.getPhasesInManifestation()
        .then(phases => {
          this.phasesList = phases;
        })
        .catch(err => this.notificationsService.error('COULD_NOT_LOAD_DATA'));
    }

    this.runService.notify('deleteRun')
      .subscribe(run => this.getData());

      this.runService.notify('validateRun')
      .subscribe(run => this.getData());
  }

  onPhaseClicked(event: any) {
    this.phaseSelected = event.item;
    this.getData();
  }

  getData() {
    this.runService.getDataForRanking(this.phaseSelected)
    .then(data => {
      for (let i = 0; i < data.length; i++ ) {
        data[i].rank = i + 1;
      }
      this.source.load(data);
      this.source.refresh();
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
