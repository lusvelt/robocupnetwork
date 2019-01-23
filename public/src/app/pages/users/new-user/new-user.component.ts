import { UserInterface } from './../../../interfaces/user.interface';
import { UsersService } from './../../../services/users.service';
import { Component, OnInit } from '@angular/core';
import { PrivilegesService } from '../../../services/privileges.service';
import { NotificationsService } from '../../../services/notifications.service';
import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';
import * as _ from 'lodash';
import { TranslateService } from '@ngx-translate/core';
import { values } from '../../../config/values.config';
import { ManifestationsService } from '../../../services/manifestations.service';
import { NbDialogService } from '@nebular/theme';
import { RolesListComponent } from '../../../shared/dialogs/roles-list/roles-list.component';
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
    manifestations: []
  };

  manifestationsList: [];

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
              private config: NgbDropdownConfig) {
                config.autoClose = false;
               }

  ngOnInit() {
    this.manifestationsService.getManifestations()
    .then(manifestations => this.manifestationsList = manifestations);
  }



  onButtonClicked() {
    const user: UserInterface = _.omit(this.user, ['confirmPassword']);
    user.birthDate = new Date(user.birthDate);
    this.usersService.createUser(user)
    .then(_user => {
      // ARRIVA ARRAY VUOTO
      this.notificationsService.success('USER_CREATED');
    });
  }

  onManifestationClicked(manifestation: any) {
    this.dialogService.open(RolesListComponent, {
      context: {
        title: manifestation.name
      },
    }).onClose.subscribe(roles => {
      // Da sistemare quando modifichi
      // this.user.manifestations.splice(this.user.manifestations.findIndex ( el => el.id === this.user.manifestations.id), 1);
      if (roles)
        if (roles.length !== 0) {
         manifestation.roles = roles;
         this.user.manifestations.push(manifestation);
         this.notificationsService.success('ADDED_ROLES_IN_MANIFESTATION');
        }
    });
  }
}
