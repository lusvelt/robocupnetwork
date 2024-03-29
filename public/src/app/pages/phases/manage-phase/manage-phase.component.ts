import { PhaseInterface } from './../../../interfaces/phase.interface';
import { DataSource } from './../../../classes/data-source.class';
import { PhasesService } from './../../../services/phases.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { TablesService } from '../../../services/tables.service';
import { TranslateService } from '@ngx-translate/core';
import { NotificationsService } from '../../../services/notifications.service';
import { ModalService } from '../../../services/modal.service';
import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';
import * as _ from 'lodash';
import { notAddableConfig } from '../../../config/tables.config';
import { DatePipe } from '@angular/common';
import { Subscription } from 'rxjs/Subscription';
import { SingleDateComponent } from '../../../shared/view-cells/single-date/single-date.component';
import { AuthService } from '../../../services/auth.service';
import { CategoriesService } from '../../../services/categories.service';
import { NbDialogService } from '@nebular/theme';
import { TeamsListComponent } from '../../../shared/dialogs/teams-list/teams-list.component';
import { SingleDateTimeComponent } from '../../../shared/view-cells/single-date-time/single-date-time.component';
import { SingleButtonComponent } from '../../../shared/view-cells/single-button/single-button.component';
import { QRCodesPDFService } from './../../../services/qr-codes-pdf.service';
import { TeamService } from '../../../services/team.service';

@Component({
  selector: 'ngx-manage-phase',
  templateUrl: './manage-phase.component.html',
  styleUrls: ['./manage-phase.component.scss']
})
export class ManagePhaseComponent implements OnInit, OnDestroy {

  phase: any = {
    name: '',
    description: '',
    numAdmittedTeams: '',
    numPassingTeams: '',
    numField: '',
    show: false
  };
  subscriptions: Subscription[] = [];
  source: DataSource = new DataSource();

  categoriesList: any = [];
  sessions: any = [];

  constructor(private tablesService: TablesService,
    private translateService: TranslateService,
    private notificationsService: NotificationsService,
    private modalService: ModalService,
    private phasesService: PhasesService,
    private config: NgbDropdownConfig,
    private datePipe: DatePipe,
    public authService: AuthService,
    private teamService: TeamService,
    private qrCodesPdfService: QRCodesPDFService,
    private categoriesService: CategoriesService,
    private dialogService: NbDialogService) {
      config.autoClose = false;
        }

  ngOnInit() {
    if (this.authService.isManifestationSelected() && this.authService.canDo('getPhasesInManifestation')) {
      this.phasesService.getPhasesInManifestation()
        .then(phase => {
          this.source.load(phase);
        })
        .catch(err => this.notificationsService.error('COULD_NOT_LOAD_DATA'));
    }

    this.categoriesService.getCategories()
    .then(categories => {
      this.categoriesList = categories;
    })
    .catch(err => this.notificationsService.error('COULD_NOT_LOAD_DATA'));

    this.subscriptions.push(
      this.phasesService.notify('createPhase')
      .subscribe(data => {
        if (data._manifestation.id === this.authService.getManifestation().id)
          this.source.insert(data.phase);
      }));

    this.subscriptions.push(
      this.phasesService.notify('editPhase')
      .subscribe(data => {
        if (data._manifestation.id === this.authService.getManifestation().id)
          this.source.edit(data._phase);
      }));

    this.subscriptions.push(
      this.phasesService.notify('removePhase')
      .subscribe(data => {
        if (data._manifestation.id === this.authService.getManifestation().id)
          this.source.delete(data._phase);
      }));

    this.subscriptions.push(
      this.phasesService.notify('updatePhaseStart')
      .subscribe(data => {
        if (data._manifestation.id === this.authService.getManifestation().id)
          this.source.edit(data.phase);
      }));

    this.subscriptions.push(
      this.phasesService.notify('updatePhaseEnd')
      .subscribe(data => {
        if (data._manifestation.id === this.authService.getManifestation().id)
          this.source.edit(data.phase);
      }));
  }


  onTeamCliked() {
    this.dialogService.open(TeamsListComponent, {
      context: {
        title: 'Teams',
        oldTeams: this.phase.teams ? this.phase.teams : []
      },
      autoFocus: true,
    }).onClose.subscribe(teams => {
      this.phase.teams = teams;
    });
  }

  addSession() {
    this.sessions.length ++;
  }

  destroySession() {
    this.sessions.length--;
  }

  checkIfDateNotValid(d) {
    try {
        const date = new Date(d);
        return !(d.getTime() === d.getTime());
    }catch (e) {
        return true;
    }

}

  onButtonClicked() {
    if (this.authService.canDo('createPhase')) {
    const phase: PhaseInterface = _.cloneDeep(this.phase);

    phase.start = new Date(this.phase.start);
    phase.end = new Date(this.phase.end);


    if (phase.name !== '' && phase.description !== '' && phase.teams !== undefined && phase.teams.length !== 0) {
      if (!this.checkIfDateNotValid(phase.start) && !this.checkIfDateNotValid(phase.end)) {
        this.phasesService.createPhase(phase, this.authService.getManifestation())
        .then(_phase => {
          this.notificationsService.success('PHASES_CREATED');
          this.source.insert(_phase);
          this.phase.show = false;
        });
      } else {
        this.notificationsService.error('DATA_IS_NOT_VALID');
      }
    } else {
      this.notificationsService.error('YOU_SHOULD_INSERT_DATA');
    }
  } else {
    this.notificationsService.error('UNAUTHORIZED');
  }
  }

  settings = this.tablesService.getSettings(notAddableConfig, {
    id: {
      title: 'ID',
      type: 'number',
      addable: false,
      editable: false
    },
    name: {
      title: 'NAME',
      type: 'text',
    },
    description: {
      title: 'DESCRIPTION',
      type: 'text',
    },
    start: {
      title: 'START',
      type: 'number',
      editable: true,
      addable: false, /*
      renderComponent: SingleDateTimeComponent,
      onComponentInitFunction: (instance) => {
        instance.internalKey = 'start';
        instance.parentNotifier.on('change', changed => {
          this.phasesService.updateStart(instance.rowData, this.authService.getManifestation(), changed)
          .then(result => this.notificationsService.success('START_UPDATE_SUCCEDED'))
          .catch(err => this.notificationsService.error('OPERATION_FAILED_ERROR_MESSAGE'));
        });
      }*/
    },
    end: {
      title: 'END',
      type: 'number',
      editable: true,
      addable: false, /*
      renderComponent: SingleDateComponent,
      onComponentInitFunction: (instance) => {
        instance.internalKey = 'end';
        instance.parentNotifier.on('change', changed => {
          this.phasesService.updateEnd(instance.rowData, this.authService.getManifestation(), changed)
          .then(result => this.notificationsService.success('END_UPDATE_SUCCEDED'))
          .catch(err => this.notificationsService.error('OPERATION_FAILED_ERROR_MESSAGE'));
        });
      }*/
    },
    numAdmittedTeams: {
      title: 'PHASE_NUM_ADMITTED_TEAMS',
      type: 'number',
    },
    numPassingTeams: {
      title: 'PHASE_NUM_PASSING_TEAMS',
      type: 'number',
    },
    teams: {
      title: 'TEAMS',
      type: 'custom',
      renderComponent: SingleButtonComponent,
      onComponentInitFunction: (instance) => {
        instance.internalKey = 'openTeamInPhaseModal'; /*
        instance.parentNotifier.on('change', changed => {
          this.usersService.updateUserBirthdate(instance.rowData, changed)
            .then(result => this.notificationsService.success('BIRTHDATE_UPDATE_SUCCEDED'))
            .catch(err => this.notificationsService.error('OPERATION_FAILED_ERROR_MESSAGE'));
        });*/
      }
    },
    categoryId: {
      title: 'CATEGORY',
      type: 'text',
      editable: true,
      addable: false
    },
    qrCode: {
      title: 'GENERATE_QR_CODE',
      type: 'custom',
      renderComponent: SingleButtonComponent,
      onComponentInitFunction: (instance) => {
        instance.internalKey = 'generateQrCodeModal';
      }
    },
    delete_lowest_run: {
      title: 'DELETE_LOWEST_RUN',
      type: 'custom',
      renderComponent: SingleButtonComponent,
      onComponentInitFunction: (instance) => {
        instance.internalKey = 'deleteLowestRun';
      }
    }
  });

  onEditConfirm(event) {
    if (this.authService.canDo('editPhase')) {
      event.confirm.resolve();
      this.phasesService.editPhase(event.newData,  this.authService.getManifestation())
        .then(result => this.notificationsService.success('PHASE_UPDATED'))
        .catch(err => this.notificationsService.error('OPERATION_FAILED_ERROR_MESSAGE'));
    } else {
      this.notificationsService.error('UNAUTHORIZED');
    }
  }

  onDeleteConfirm(event): void {
    if (this.authService.canDo('removePhase')) {
      this.modalService.confirm('ARE_YOU_SURE_YOU_WANT_TO_DELETE')
        .then(confirmation => {
          if (confirmation) {
            event.confirm.resolve();
            this.phasesService.removePhase(event.data,  this.authService.getManifestation())
              .then(result => this.notificationsService.success('DELETE_SUCCEDED'))
              .catch(err => this.notificationsService.error('OPERATION_FAILED_ERROR_MESSAGE'));
          } else {
            event.confirm.reject();
          }
        });
    } else {
      this.notificationsService.error('UNAUTHORIZED');
    }
  }

  toggleForm() {
    this.phase.show = !this.phase.show;
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

}
