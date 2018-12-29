import { NotificationsService } from './../../../../services/notifications.service';
import { AuthService } from './../../../../services/auth.service';
import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import 'rxjs/add/operator/catch';

@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {

  constructor (private translate: TranslateService,
               private authService: AuthService,
               private router: Router,
               private notificationsService: NotificationsService
  ) { }

  redirectDelay: number = 0;
  strategy: string = '';

  errors: string[] = [];
  messages: string[] = [];

  user: any = {};

  submitted: boolean = false;
  rememberMe = false;

  onLoginButtonPress(): void {
    this.authService.login(this.user)
      .then(() => {
        this.notificationsService.success('LOGIN_SUCCESSFUL');
        this.router.navigate(['/pages', 'dashboard']);
      }, err => this.notificationsService.error('WRONG_EMAIL_OR_PASSWORD'));
  }

}
