import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {

  constructor (private translate: TranslateService,
               private http: HttpClient,
               private router: Router
  ) { }

  redirectDelay: number = 0;
  showMessages: any = {};
  strategy: string = '';

  errors: string[] = [];
  messages: string[] = [];

  user: any = {};

  submitted: boolean = false;
  rememberMe = false;

  login(): void {
    this.http.post('http://localhost:3000/login', this.user)
      .catch((err) => {
        this.showMessages.error = true;
        this.errors.push(err.code);
        return Observable.throw(err);
      })
      .subscribe((response: any) => {
        localStorage.setItem('token', response.token);
        this.router.navigate(['/pages', 'dashboard']);
      });
  }

}
