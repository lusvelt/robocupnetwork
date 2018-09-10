import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {

  constructor (private translate: TranslateService) { }

  redirectDelay: number = 0;
  showMessages: any = {};
  strategy: string = '';

  errors: string[] = [];
  messages: string[] = [];
  user: any = {};
  submitted: boolean = false;
  rememberMe = false;

  login(): void {
    this.showMessages.error = true;
    this.errors.push('WRONG_EMAIL_OR_PASSWORD');
  }

}
