import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { NotificationsService } from '../../services/notifications.service';

import 'rxjs/add/operator/catch';
import { style } from '@angular/animations';

@Component({
  selector: 'ngx-login-mobile',
  templateUrl: './login-mobile.component.html',
  styleUrls: ['./login-mobile.component.scss']
})
export class LoginMobileComponent {

  constructor(private translate: TranslateService,
              private authService: AuthService,
              private router: Router,
              private notificationsService: NotificationsService) { }


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
        this.router.navigate(['/mobile', 'dashboard']);
      }, err => this.notificationsService.error('WRONG_EMAIL_OR_PASSWORD'));
  }

  qrCode() {
  }

}