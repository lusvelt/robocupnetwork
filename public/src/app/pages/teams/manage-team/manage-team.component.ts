import { AgeRangesService } from './../../../services/age-ranges.service';
import { MultipleSelectDropdownComponent } from './../../../shared/view-cells/multiple-select-dropdown/multiple-select-dropdown.component';
import { DataSource } from './../../../classes/data-source.class';
import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { TablesService } from '../../../services/tables.service';
import { NotificationsService } from '../../../services/notifications.service';
import { ModalService } from '../../../services/modal.service';
import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';
import { TeamService } from '../../../services/team.service';
import { notAddableConfig } from '../../../config/tables.config';
import { TeamInterface } from '../../../interfaces/team.interface';
import * as _ from 'lodash';

@Component({
  selector: 'ngx-manage-team',
  templateUrl: './manage-team.component.html',
  styleUrls: ['./manage-team.component.scss']
})
export class ManageTeamComponent implements OnInit {

  team: any = {
    name: '',
    show: false,
    ageRanges: []
  };

  source: DataSource = new DataSource();

  constructor(private tablesService: TablesService,
              private translateService: TranslateService,
              private notificationsService: NotificationsService,
              private modalService: ModalService,
              private config: NgbDropdownConfig,
              private teamService: TeamService,
              private ageRangeService: AgeRangesService) {
    }


  ngOnInit() {
    this.teamService.getTeams()
      .then(team => {
        this.source.load(team);
      })
      .catch(err => this.notificationsService.error('COULD_NOT_LOAD_DATA'));

    this.teamService.notify('createTeam')
      .subscribe(team => this.source.insert(team));

    this.teamService.notify('editTeam')
      .subscribe(team => this.source.edit(team));

    this.teamService.notify('removeTeam')
      .subscribe(team => this.source.delete(team));

    this.ageRangeService.getAgeRanges()
    .then(ageRanges => this.team.ageRanges = ageRanges)
    .catch(err => this.notificationsService.error('COULD_NOT_LOAD_DATA'));

    this.getNotifiedForAgeRanges(this.team.ageRanges);
  }

  getNotifiedForAgeRanges(ageRangesArray: any[]) {
    this.ageRangeService.notify('createAgeRange')
    .subscribe(ageRange => ageRangesArray.push(ageRange));

    this.ageRangeService.notify('editAgeRange')
      .subscribe(ageRange => ageRangesArray.splice(ageRangesArray.findIndex(el => el.id === ageRange.id), 1, ageRange));

    this.ageRangeService.notify('removeAgeRange')
      .subscribe(ageRange => ageRangesArray.splice(ageRangesArray.findIndex(el => el.id === ageRange.id), 1));
  }

  onButtonClicked() {
    const team: TeamInterface = _.cloneDeep(this.team);
    team.ageRanges = team.ageRanges.filter((teams: any) => teams.selected);
    if (team.ageRanges.length === 1) {
      this.teamService.createTeam(team)
      .then(_team => {
        this.notificationsService.success('TEAM_CREATED');
        this.source.insert(_team);
        this.team.show = false;
      });
    }else {
      this.notificationsService.error('SELECTED_MORE_AGE_RANGES');
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
    }
  });

  onEditConfirm(event) {
    event.confirm.resolve();
    this.teamService.editTeam(event.newData)
      .then(result => this.notificationsService.success('TEAM_UPDATED'))
      .catch(err => this.notificationsService.error('OPERATION_FAILED_ERROR_MESSAGE'));
  }

  onDeleteConfirm(event): void {
    this.modalService.confirm('ARE_YOU_SURE_YOU_WANT_TO_DELETE')
      .then(confirmation => {
        if (confirmation) {
          event.confirm.resolve();
          this.teamService.removeTeam(event.data)
            .then(result => this.notificationsService.success('DELETE_SUCCEDED'))
            .catch(err => this.notificationsService.error('OPERATION_FAILED_ERROR_MESSAGE'));
        } else {
          event.confirm.reject();
        }
      });
  }

  toggleForm() {
    this.team.show = !this.team.show;
  }

}
