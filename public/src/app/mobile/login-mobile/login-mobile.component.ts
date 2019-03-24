import { environment } from './../../../environments/environment';
import { MobileService } from './../../services/mobile.service';
import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { NotificationsService } from '../../services/notifications.service';

import 'rxjs/add/operator/catch';

@Component({
  selector: 'ngx-login-mobile',
  templateUrl: './login-mobile.component.html',
  styleUrls: ['./login-mobile.component.scss']
})
export class LoginMobileComponent implements OnInit {

  constructor(private translate: TranslateService,
              private authService: AuthService,
              private router: Router,
              private notificationsService: NotificationsService,
              private mobileService: MobileService) { }


  redirectDelay: number = 0;
  strategy: string = '';

  errors: string[] = [];
  messages: string[] = [];

  user: any = {};
  settings: any = {
    apiUrl: ''
  };

  submitted: boolean = false;
  rememberMe = false;
  updatesChecked: boolean = false;

  ngOnInit() {
    if (!environment.mobile)
      this.updatesChecked = true;
    this.settings.apiUrl = environment.apiUrl;
    this.mobileService.checkForUpdates()
      .then(result => {
        this.updatesChecked = true;
        if (result)
          this.router.navigate(['/mobile', 'new-app-version']);
      })
      .catch(err => {});
  }

  onLoginButtonPress(): void {
    this.authService.login(this.user)
      .then(() => {
        this.notificationsService.success('LOGIN_SUCCESSFUL');
        this.router.navigate(['/mobile', 'dashboard']);
      }, err => this.notificationsService.error('WRONG_EMAIL_OR_PASSWORD'));
  }

  changeApiUrl() {
    environment.apiUrl = this.settings.apiUrl;
    this.notificationsService.success('URL_MODIFIED');
  }

  qrCode() {
  }

  languageSelect(language) {
    if (language === 'italian')
      this.translate.setDefaultLang('it');
    if (language === 'english')
      this.translate.setDefaultLang('en');
  }

}
