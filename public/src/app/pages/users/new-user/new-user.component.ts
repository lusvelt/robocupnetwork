import { Observable } from 'rxjs/Observable';
import { UserInterface } from './../../../interfaces/user.interface';
import { UsersService } from './../../../services/users.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { PrivilegesService } from '../../../services/privileges.service';
import { NotificationsService } from '../../../services/notifications.service';
import { NgbDropdownConfig, NgbTypeaheadConfig, NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import * as _ from 'lodash';
import { TranslateService } from '@ngx-translate/core';
import { values } from '../../../config/values.config';
import { ManifestationsService } from '../../../services/manifestations.service';
import { NbDialogService } from '@nebular/theme';
import { RolesListComponent } from '../../../shared/dialogs/roles-list/roles-list.component';
import { Subject } from 'rxjs/Subject';
import { debounceTime, distinctUntilChanged, filter, map } from 'rxjs/operators';
import { merge } from 'rxjs';
import { forEach } from '@angular/router/src/utils/collection';
import { AuthService } from './../../../services/auth.service';

@Component({
  selector: 'ngx-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.scss']
})
export class NewUserComponent implements OnInit {
  user: any = {
    name: '',
    surname: '',
    birthDate: '',
    email: '',
    password: '',
    isAdmin: false,
    manifestations: [],
    standardRoles: [],
  };

  isOneRoleInManifestation: boolean = true;
  isOneStandardRole: boolean = true;

  manifestationsList: [];
  rolesList: [];
  @ViewChild('searchManifestationInstance') searchManifestationInstance: NgbTypeahead;
  focus$ = new Subject<string>();
  click$ = new Subject<string>();

  manifestationsFormatter = (value: any) => value.name;

  searchManifestation = (text$: Observable<string>) => {
    const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
    const clicksWithClosedPopup$ = this.click$.pipe(filter(() => !this.searchManifestationInstance.isPopupOpen()));
    const inputFocus$ = this.focus$;

    return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
      map(term => (term === '' ? this.manifestationsList
        : this.manifestationsList.filter((v: any) => v.name.toLowerCase().indexOf(term.toLowerCase()) > -1)).slice(0, 10))
    );
  }

  passwordRange = {
    minLength: values.passwordMinLength,
    maxLength: values.passwordMaxLength
  };


  constructor(private privilegesService: PrivilegesService,
              private usersService: UsersService,
              private manifestationsService: ManifestationsService,
              private notificationsService: NotificationsService,
              private dialogService: NbDialogService,
              private transalteService: TranslateService,
              public authService: AuthService,
              private ngbDropdownConfig: NgbDropdownConfig) {
                ngbDropdownConfig.autoClose = false;
  }

  ngOnInit() {
    if (this.authService.canDo('createUsers')) {
    this.manifestationsService.getManifestations()
    .then(manifestations => this.manifestationsList = manifestations);

    this.privilegesService.getRoles()
    .then(roles => {
      this.user.standardRoles = roles.filter((role: any) => role.dependsOnManifestation === false);
    });
  }else {
    this.notificationsService.error('UNAUTHORIZED');
  }

  }



  onButtonClicked() {
    /* ASSEGNAMENTAZIONE RUOLI ALL'ADMIN
      if (this.user.isAdmin) {
      this.user.manifestations = this.manifestationsList;
      this.user.manifestations.forEach(manifestation => {
        manifestation.roles = this.rolesList;
      });
    } */
    const user: UserInterface = _.omit(this.user, ['confirmPassword']);
    user.standardRoles = user.standardRoles.filter((role: any) => role.selected);
    user.birthDate = new Date(user.birthDate);
    if (user.name !== '' && user.surname !== '' && user.email !== '' && user.password !== '') {
      this.usersService.createUser(user)
        .then(_user => this.notificationsService.success('USER_CREATED'));
    } else {
      this.notificationsService.error('YOU_SHOULD_INSERT_DATA');
    }
  }

  onManifestationClicked(event: any) {
    event.preventDefault();
    const manifestation = event.item;
    const userManifestation = this.user.manifestations.find(m => m.id === manifestation.id);
    this.dialogService.open(RolesListComponent, {
      context: {
        title: manifestation.name,
        oldRoles: userManifestation ? userManifestation.roles : []
      }
    }).onClose.subscribe(roles => {
      const index = this.user.manifestations.findIndex(el => el.id === manifestation.id);
      if (index !== -1)
        this.user.manifestations.splice(index, 1);
      if (roles) {
        if (roles.length !== 0) {
          manifestation.roles = roles;
          this.user.manifestations.push(manifestation);
          this.notificationsService.success('ADDED_ROLES_IN_MANIFESTATION');
        }
      }
      if (this.user.manifestations.length === 0) {
        this.isOneRoleInManifestation = true;
      }else {
        this.isOneRoleInManifestation = false;
      }
    });
  }
}
