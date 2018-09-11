import { NbAuthService, NbAuthResult } from '@nebular/auth';
import { TranslateService } from '@ngx-translate/core';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject } from '@angular/core';

@Component({
  selector: 'ngx-reset-password-page',
  styleUrls: ['./reset-password.component.scss'],
  templateUrl: './reset-password.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ResetPasswordComponent {

  redirectDelay: number = 0;
  showMessages: any = {};
  strategy: string = '';

  submitted = false;
  errors: string[] = [];
  messages: string[] = [];
  user: any = {};

  constructor(protected service: NbAuthService, private translate: TranslateService) { }

  resetPass(): void {
    this.errors = this.messages = [];
    this.submitted = true;
  }
}

