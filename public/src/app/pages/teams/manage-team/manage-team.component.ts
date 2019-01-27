import { AgeRangesService } from './../../../services/age-ranges.service';
import { MultipleSelectDropdownComponent } from './../../../shared/view-cells/multiple-select-dropdown/multiple-select-dropdown.component';
import { DataSource } from './../../../classes/data-source.class';
import { debounceTime, distinctUntilChanged, filter, map } from 'rxjs/operators';
import { Component, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { TablesService } from '../../../services/tables.service';
import { NotificationsService } from '../../../services/notifications.service';
import { ModalService } from '../../../services/modal.service';
import { NgbDropdownConfig, NgbTypeaheadConfig, NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import { TeamService } from '../../../services/team.service';
import { SchoolService } from '../../../services/schools.service';
import { notAddableConfig } from '../../../config/tables.config';
import { TeamInterface } from '../../../interfaces/team.interface';
import { merge } from 'rxjs';
import { values } from '../../../config/values.config';
import { Subject } from 'rxjs/Subject';
import { NbDialogService } from '@nebular/theme';
import { SchoolUsersListComponent } from '../../../shared/dialogs/school-users-list/school-users-list.component';
import { UserInterface } from './../../../interfaces/user.interface';
import { Observable } from 'rxjs/Observable';
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
    ageRanges: [],
    schools: []
  };

  isOneUserInSchool: boolean = true;

 schoolsList: [];
  @ViewChild('searchSchoolInstance') searchSchoolInstance: NgbTypeahead;
  focus$ = new Subject<string>();
  click$ = new Subject<string>();

  schoolsFormatter = (value: any) => value.name;

  searchSchool = (text$: Observable<string>) => {
    const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
    const clicksWithClosedPopup$ = this.click$.pipe(filter(() => !this.searchSchoolInstance.isPopupOpen()));
    const inputFocus$ = this.focus$;

    return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
      map(term => (term === '' ? this.schoolsList
        : this.schoolsList.filter((v: any) => v.name.toLowerCase().indexOf(term.toLowerCase()) > -1)).slice(0, 10))
    );
  }

  source: DataSource = new DataSource();

  constructor(private tablesService: TablesService,
              private translateService: TranslateService,
              private notificationsService: NotificationsService,
              private modalService: ModalService,
              private config: NgbDropdownConfig,
              private dialogService: NbDialogService,
              private teamService: TeamService,
              private schoolService: SchoolService,
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

    this.schoolService.getSchools()
    .then(schools => this.schoolsList = schools);
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
  onSchoolClicked(event: any) {
    event.preventDefault();
    const school = event.item;
    const teamSchool = this.team.schools.find(m => m.id === school.id);
    this.dialogService.open(SchoolUsersListComponent, {
      context: {
        title: school.name,
        oldUsers: teamSchool ? teamSchool.users : []
      }
    }).onClose.subscribe(users => {
      const index = this.team.schools.findIndex(el => el.id === school.id);
      if (index !== -1)
        this.team.schools.splice(index, 1);
      if (users) {
        if (users.length !== 0) {
          school.users = users;
          this.team.schools.push(school);
          this.notificationsService.success('ADDED_USERS_IN_SCHOOL');
        }
      }
      if (this.team.schools.length === 0) {
        this.isOneUserInSchool = true;
      }else {
        this.isOneUserInSchool = false;
      }
    });
  }

  toggleForm() {
    this.team.show = !this.team.show;
  }

}
