import { confirmSettings } from './../../../config/modal.config';
import { Component, OnInit, Input } from '@angular/core';
import { ModalService } from '../../../services/modal.service';
import { ViewOnlyRolesModalComponent } from '../../modals/view-only-roles-modal/view-only-roles-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TeamsListComponent } from '../../dialogs/teams-list/teams-list.component';
import { NbDialogService } from '@nebular/theme';
import { PhasesService } from '../../../services/phases.service';
import { NotificationsService } from '../../../services/notifications.service';
import { EventsService } from '../../../services/events.service';
import { EventsListComponent } from '../../dialogs/events-list/events-list.component';

@Component({
  selector: 'ngx-single-button',
  templateUrl: './single-button.component.html',
  styleUrls: ['./single-button.component.scss']
})
export class SingleButtonComponent implements OnInit {
  @Input() value: any;
  @Input() rowData: any;
  internalKey: string;
  constructor(private modalService: NgbModal,
              private dialogService: NbDialogService,
              private phasesService: PhasesService,
              private notificationsService: NotificationsService,
              private eventsService: EventsService) { }

  ngOnInit() {
  }

  onClick() {
    if (this.internalKey === 'openRolesModal') {
      const modal = this.modalService.open(ViewOnlyRolesModalComponent);
      modal.componentInstance.user = this.rowData;
    }

    if (this.internalKey === 'openTeamInPhaseModal') {
      this.phasesService.getTeamsInPhase(this.rowData)
      .then(res => {
        this.rowData.teams = res;
        this.dialogService.open(TeamsListComponent, {
          context: {
            title: 'Teams',
            oldTeams: this.rowData ? this.rowData.teams : [],
          },
          closeOnBackdropClick: false,
          autoFocus: true,
        }).onClose.subscribe(teams => {
          if (teams !== undefined)
            this.phasesService.updateTeamsInPhase(this.rowData, teams)
            .then(() => this.notificationsService.success('TEAMS_IN_PHASE_EDIT_SUCCESSFUL'))
            .catch(err => this.notificationsService.error('OPERATION_FAILED_ERROR_MESSAGE'));

        });
      });
    }

    if (this.internalKey === 'openSettingsInCategoryModal') {
      this.eventsService.getEventsInCategory(this.rowData)
      .then(res => {
        this.dialogService.open(EventsListComponent, {
          context: {
            title: 'EVENTS',
            events: res ? res : [],
            category: this.rowData
          },
          closeOnBackdropClick: false,
          autoFocus: true
        });
      });

    }
  }

}
