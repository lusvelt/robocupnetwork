import { AgeRangesService } from './../../../services/age-ranges.service';
import { MultipleSelectDropdownComponent } from './../../../shared/view-cells/multiple-select-dropdown/multiple-select-dropdown.component';
import { DataSource } from './../../../classes/data-source.class';
import { debounceTime, distinctUntilChanged, filter, map } from 'rxjs/operators';
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { TablesService } from '../../../services/tables.service';
import { NotificationsService } from '../../../services/notifications.service';
import { ModalService } from '../../../services/modal.service';
import { NgbDropdownConfig, NgbTypeaheadConfig, NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import { TeamService } from '../../../services/team.service';
import { UsersService } from '../../../services/users.service';
import { SchoolService } from '../../../services/schools.service';
import { notAddableConfig } from '../../../config/tables.config';
import { TeamInterface } from '../../../interfaces/team.interface';
import { merge, Subscription } from 'rxjs';
import { values } from '../../../config/values.config';
import { Subject } from 'rxjs/Subject';
import { NbDialogService } from '@nebular/theme';
import { UsersListComponent } from '../../../shared/dialogs/users-list/users-list.component';
import { UserInterface } from './../../../interfaces/user.interface';
import { Observable } from 'rxjs/Observable';
import * as _ from 'lodash';

@Component({
  selector: 'ngx-manage-team',
  templateUrl: './manage-team.component.html',
  styleUrls: ['./manage-team.component.scss']
})
export class ManageTeamComponent implements OnInit, OnDestroy {

  team: any = {
    name: '',
    show: false,
    ageRanges: [],
    schools: [],
    users: []
  };

  isOneUserInTeam: boolean = true;

 usersList: [];
  @ViewChild('searchUserInstance') searchUserInstance: NgbTypeahead;
  focus$ = new Subject<string>();
  click$ = new Subject<string>();

  usersFormatter = (value: any) => [value.name, value.surname, value.birthDate];

  searchUser = (text$: Observable<string>) => {
    const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
    const clicksWithClosedPopup$ = this.click$.pipe(filter(() => !this.searchUserInstance.isPopupOpen()));
    const inputFocus$ = this.focus$;

    return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
      map(term => (term === '' ? this.usersList
        :  this.usersList.filter((v: any) => v.name.toLowerCase().indexOf(term.toLowerCase()) > -1)).slice(0, 10))
    );
  }

  subscriptions: Subscription[] = [];
  source: DataSource = new DataSource();

  constructor(private tablesService: TablesService,
              private translateService: TranslateService,
              private notificationsService: NotificationsService,
              private modalService: ModalService,
              private config: NgbDropdownConfig,
              private dialogService: NbDialogService,
              private teamService: TeamService,
              private schoolService: SchoolService,
              private ageRangeService: AgeRangesService,
              private usersService: UsersService) {
    }


  ngOnInit() {
    this.teamService.getTeams()
     .then(team => {
      this.source.load(team);
    })
    .catch(err => this.notificationsService.error('COULD_NOT_LOAD_DATA'));
    this.subscriptions.push(
     this.teamService.notify('createTeam')
      .subscribe(team => this.source.insert(team)));
    this.subscriptions.push(
     this.teamService.notify('editTeam')
      .subscribe(team => this.source.edit(team)));

    this.subscriptions.push(
     this.teamService.notify('removeTeam')
      .subscribe(team => this.source.delete(team)));

    this.ageRangeService.getAgeRanges()
    .then(ageRanges => this.team.ageRanges = ageRanges)
    .catch(err => this.notificationsService.error('COULD_NOT_LOAD_DATA'));

    this.getNotifiedForAgeRanges(this.team.ageRanges);
    this.schoolService.getSchools()
    .then(schools => this.team.schools = schools)
    .catch(err => this.notificationsService.error('COULD_NOT_LOAD_DATA'));

    this.getNotifiedForSchools(this.team.schools);

    this.usersService.getUsers()
    .then(users => this.usersList = users);
  }

  getNotifiedForAgeRanges(ageRangesArray: any[]) {
    this.ageRangeService.notify('createAgeRange')
    .subscribe(ageRange => ageRangesArray.push(ageRange));

    this.ageRangeService.notify('editAgeRange')
      .subscribe(ageRange => ageRangesArray.splice(ageRangesArray.findIndex(el => el.id === ageRange.id), 1, ageRange));

    this.ageRangeService.notify('removeAgeRange')
      .subscribe(ageRange => ageRangesArray.splice(ageRangesArray.findIndex(el => el.id === ageRange.id), 1));
  }
  getNotifiedForSchools(schoolsArray: any[]) {
    this.schoolService.notify('createSchool')
    .subscribe(school => schoolsArray.push(school));

    this.schoolService.notify('editSchool')
      .subscribe(school => schoolsArray.splice(schoolsArray.findIndex(el => el.id === school.id), 1, school));

    this.schoolService.notify('removeSchool')
      .subscribe(school => schoolsArray.splice(schoolsArray.findIndex(el => el.id === school.id), 1));
  }

  onButtonClicked() {
    const team: TeamInterface = _.cloneDeep(this.team);
    team.ageRanges = team.ageRanges.filter((teams: any) => teams.selected);
    if (team.ageRanges.length === 1 && team.name !== '') {
      this.teamService.createTeam(team)
      .then(_team => {
        this.notificationsService.success('TEAM_CREATED');
        this.source.insert(_team);
        this.team.show = false;
      });
    }else {
      this.notificationsService.error('YOU_SHOULD_INSERT_DATA');
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
  onUserClicked(event: any) {
    event.preventDefault();
    const user = event.item;
    const teamUser = this.team.users.find(m => m.id === user.id);
    this.dialogService.open(UsersListComponent, {
      context: {
        title: user.name,
        oldUsers: teamUser ? teamUser : []
      }
    }).onClose.subscribe(users => {
      const index = this.team.users.findIndex(el => el.id === user.id);
      if (index !== -1)
        this.team.users.splice(index, 1);
      if (users) {
        if (users.length !== 0) {
          this.team.users = users;
          this.team.users.push(user);
          this.notificationsService.success('ADDED_USERS_IN_TEAM');
        }
      }
      if (this.team.users.length === 0) {
        this.isOneUserInTeam = true;
      }else {
        this.isOneUserInTeam = false;
      }
    });
  }

  toggleForm() {
    this.team.show = !this.team.show;
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

}
