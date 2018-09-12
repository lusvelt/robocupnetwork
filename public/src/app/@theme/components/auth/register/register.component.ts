import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject } from '@angular/core';
import { NbAuthService } from '@nebular/auth';
import { TranslateService } from '@ngx-translate/core';


import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Observable';

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
              private translate: TranslateService,
              private http: HttpClient,
              private router: Router) { }

  register(): void {
    this.http.post('http://localhost:3000/register', this.user)
      .catch((err) => {
        this.showMessages.error = true;
        this.errors.push(err.code);
        return Observable.throw(err);
      })
      .subscribe((response: any) => {
        this.router.navigate(['/auth', 'login']);
      });
  }
}
