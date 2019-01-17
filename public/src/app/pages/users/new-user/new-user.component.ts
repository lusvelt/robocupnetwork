import { UserInterface } from './../../../interfaces/user.interface';
import { UsersService } from './../../../services/users.service';
import { Component, OnInit } from '@angular/core';
import { PrivilegesService } from '../../../services/privileges.service';
import { NotificationsService } from '../../../services/notifications.service';
import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';
import * as _ from 'lodash';
import { TranslateService } from '@ngx-translate/core';
import { values } from '../../../config/values.config';
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
    roles: []
  };

  passwordRange = {
    minLength: values.passwordMinLength,
    maxLength: values.passwordMaxLength
  };


  constructor(private privilegesService: PrivilegesService,
              private usersService: UsersService,
              private notificationsService: NotificationsService,
              private transalteService: TranslateService,
              private config: NgbDropdownConfig) {
                config.autoClose = false;
               }

  ngOnInit() {
    this.privilegesService.getRoles()
    .then(roles => this.user.roles = roles);

    this.getNotifiedForRoles(this.user.roles);
  }

  getNotifiedForRoles(roleArray: any[]) {
    this.privilegesService.notify('createRole')
      .subscribe(role => roleArray.push(role));

    this.privilegesService.notify('editRole')
      .subscribe(role =>
        roleArray.splice(roleArray.findIndex(el => el.id === role.id), 1, role));

    this.privilegesService.notify('removeRole')
      .subscribe(role =>
        roleArray.splice(roleArray.findIndex(el => el.id === role.id), 1));
  }

  onButtonClicked() {
    const user: UserInterface = _.omit(this.user, ['confirmPassword']);
    user.birthDate = new Date(user.birthDate);
    user.roles = user.roles.filter((role: any) => role.selected);
    this.usersService.createUser(user)
    .then(_user => {
      this.notificationsService.success('USER_CREATED');
    });
  }
}