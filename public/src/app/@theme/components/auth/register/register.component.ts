/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { AuthService } from './../../../../services/auth.service';
import { UserInterface } from './../../../../interfaces/user.interface';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject } from '@angular/core';
import { NbAuthService } from '@nebular/auth';
import * as _ from 'lodash';

import 'rxjs/add/operator/catch';
import { NotificationsService } from '../../../../services/notifications.service';
import { Router } from '../../../../../../node_modules/@angular/router';

@Component({
  selector: 'ngx-register',
  templateUrl: './register.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent {

  redirectDelay: number = 0;
  showMessages: any = {};
  strategy: string = '';

  submitted = false;
  errors: string[] = [];
  messages: string[] = [];
  user: any = {};

  constructor(protected service: NbAuthService,
    private notificationsService: NotificationsService,
    private authService: AuthService,
    private router: Router) { }

  onRegisterButtonPress(): void {
    const user: UserInterface = _.omit(this.user, ['confirmPassword']);
    this.authService.register(user)
      .subscribe(() => {
        this.notificationsService.success('REGISTRATION_COMPLETED');
        this.router.navigate(['/auth', 'login']);
      }, err => this.notificationsService.error(err.error.code));
  }
}
