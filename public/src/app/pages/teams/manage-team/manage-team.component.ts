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
import { AuthService } from '../../../services/auth.service';

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
    members: [],
    captain: []
  };


  isCaptain: boolean = false;
  isOneMember: boolean = false;

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
              private usersService: UsersService,
              public authService: AuthService) {
    }


  ngOnInit() {
    if (this.authService.isManifestationSelected() && this.authService.canDo('getTeams')) {
      this.teamService.getTeamsInManifestation()
      .then(teams => {
         teams.forEach(team => {
          team.ageRange = team.AgeRange.name;
          team.school = team.School.name;
          /*this.teamService.getCaptainFromId(team.id).then(res => {
            team.captain = res[0].name + ' ' + res[0].surname;
          });*/
        });
        this.source.load(teams);
      })
      .catch(err => this.notificationsService.error('COULD_NOT_LOAD_DATA'));
    }

    this.subscriptions.push(
     this.teamService.notify('createTeam')
      .subscribe(data => {
        if (data._manifestation.id === this.authService.getManifestation().id) {
          this.source.insert(data.team);
        }
      }));
    this.subscriptions.push(
     this.teamService.notify('editTeam')
      .subscribe(data => {
        if (data._manifestation.id === this.authService.getManifestation().id) {
         this.source.edit(data._team);
        }
      }));

    this.subscriptions.push(
     this.teamService.notify('removeTeam')
      .subscribe(data => {
        if (data._manifestation.id === this.authService.getManifestation().id) {
         this.source.delete(data._team);
        }
      }));

    this.ageRangeService.getAgeRanges()
    .then(ageRanges => this.team.ageRanges = ageRanges)
    .catch(err => this.notificationsService.error('COULD_NOT_LOAD_DATA'));

    this.getNotifiedForAgeRanges(this.team.ageRanges);
    this.schoolService.getSchools()
    .then(schools => {
      this.team.schools = schools;
      this.getNotifiedForSchools(this.team.schools);
    })
    .catch(err => this.notificationsService.error('COULD_NOT_LOAD_DATA'));



    this.usersService.getUsers()
    .then(users => {
      this.usersList = users;
      this.getNotifiedForUsers(this.usersList);
    })
    .catch(err => this.notificationsService.error('COULD_NOT_LOAD_DATA'));


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

  getNotifiedForUsers(usersArray: any[]) {
    this.usersService.notify('createUser')
    .subscribe(user => {
      usersArray.push(user);
    });

    this.usersService.notify('editUser')
      .subscribe(user => usersArray.splice(usersArray.findIndex(el => el.id === user.id), 1, user));

    this.usersService.notify('removeUser')
      .subscribe(user => {
        usersArray.splice(usersArray.findIndex(el => el.id === user.id), 1);
      });
  }

  onButtonClicked() {
    if (this.authService.canDo('createTeam')) {
    const team: TeamInterface = _.cloneDeep(this.team);
    const captain = team.captain;
    team.ageRanges = team.ageRanges.filter((ageRange: any) => ageRange.selected);
    team.schools = team.schools.filter((school: any) => school.selected);
    const schools = team.schools[0].name;
    const ageRanges = team.ageRanges[0].name;
    if (team.ageRanges.length === 1 && team.schools.length === 1 && team.name !== '') {
      this.teamService.createTeam(team, this.authService.getManifestation())
      .then(_team => {
        _team.captain = captain.name + ' ' + captain.surname;
        _team.ageRange = ageRanges;
        _team.school = schools;
        this.notificationsService.success('TEAM_CREATED');
        this.source.insert(_team);
        this.team.show = false;
      });
    }else {
      this.notificationsService.error('OPERATION_FAILED_ERROR_MESSAGE');
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
    }, /*
    captain: {
      title: 'CAPTAIN',
      type: 'text',
      addable: false,
      editable: false
    },*/
    school: {
      title: 'SCHOOL',
      type: 'text',
      addable: false,
      editable: false
    },
    ageRange: {
      title: 'AGE_RANGE',
      type: 'text',
      addable: false,
      editable: false
    }
  });

  onEditConfirm(event) {
    if (this.authService.canDo('editTeam')) {
      event.confirm.resolve();
      this.teamService.editTeam(event.newData, this.authService.getManifestation())
        .then(result => this.notificationsService.success('TEAM_UPDATED'))
        .catch(err => this.notificationsService.error('OPERATION_FAILED_ERROR_MESSAGE'));
    } else {
      this.notificationsService.error('UNAUTHORIZED');
    }

  }

  onDeleteConfirm(event): void {
    if (this.authService.canDo('deleteTeam')) {
      this.modalService.confirm('ARE_YOU_SURE_YOU_WANT_TO_DELETE')
        .then(confirmation => {
          if (confirmation) {
            event.confirm.resolve();
            this.teamService.removeTeam(event.data, this.authService.getManifestation())
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
  onUserClicked(event: any) {
    event.preventDefault();
    const user = event.item;
    this.isOneMember = true;
    this.team.members.push(user);
  }

  deleteCaptain() {
    this.isCaptain = false;
    this.team.captain = [];
  }

  deleteMembers() {
    this.isOneMember = false;
    this.team.members = [];
  }

  onCaptainClicked(event: any) {
    event.preventDefault();
    const user = event.item;
    this.isCaptain = true;
    this.team.captain = user;
  }

  toggleForm() {
    this.team.show = !this.team.show;
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

}
