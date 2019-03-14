import { Component, OnInit, ViewChild } from '@angular/core';
import { DataSource } from '../../../classes/data-source.class';
import { Observable, merge, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map } from 'rxjs/operators';
import { NotificationsService } from '../../../services/notifications.service';
import { PhasesService } from '../../../services/phases.service';
import { AuthService } from '../../../services/auth.service';
import { TablesService } from '../../../services/tables.service';
import { NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import { FieldsService } from '../../../services/fields.service';

@Component({
  selector: 'ngx-manage-field',
  templateUrl: './manage-field.component.html',
  styleUrls: ['./manage-field.component.scss']
})
export class ManageFieldComponent implements OnInit {

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

  fields: any = [];
  cardStatus: any;

  constructor(private tablesService: TablesService,
              public authService: AuthService,
              private phasesService: PhasesService,
              private notificationsService: NotificationsService,
              private fieldService: FieldsService) { }

  ngOnInit() {
    if (this.authService.isManifestationSelected() && this.authService.canDo('getPhasesInManifestation')) {
      this.phasesService.getPhasesInManifestation()
        .then(phases => {
          this.phasesList = phases;
        })
        .catch(err => this.notificationsService.error('COULD_NOT_LOAD_DATA'));
    }
  }

  onPhaseClicked(event: any) {
    this.phaseSelected = event.item;

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
  }


}
