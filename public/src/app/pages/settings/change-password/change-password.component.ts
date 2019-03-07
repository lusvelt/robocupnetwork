import { AuthService } from './../../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { PrivilegesService } from '../../../services/privileges.service';
import { UsersService } from '../../../services/users.service';
import { NotificationsService } from '../../../services/notifications.service';
import { NbDialogService } from '@nebular/theme';
import { TranslateService } from '@ngx-translate/core';
import { UserInterface } from '../../../interfaces/user.interface';
import { values } from '../../../config/values.config';
import { RolesListComponent } from '../../../shared/dialogs/roles-list/roles-list.component';
import * as _ from 'lodash';

@Component({
  selector: 'ngx-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})

export class ChangePasswordComponent {
  user: any = {
    password: ''
  };


  passwordRange = {
    minLength: values.passwordMinLength,
    maxLength: values.passwordMaxLength
  };

  submitted = false;

  constructor(private usersService: UsersService,
    private notificationsService: NotificationsService,
    private authService: AuthService,
    private dialogService: NbDialogService) {
  }

  onButtonClicked(): void {
    const data: UserInterface = _.omit(this.user, ['confirmPassword']);
    const userId: any = _.pick(this.authService.getUserInfo(), ['id']);
    this.usersService.changePassword(userId, data)
      .then(() => {
        this.notificationsService.success('PASSWORD_CHANGE');
      }, err => this.notificationsService.error(err.error.code));
  }

}

