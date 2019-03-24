import { ParamsService } from './../../services/params.service';
import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { NotificationsService } from '../../services/notifications.service';

import 'rxjs/add/operator/catch';
import { UserService } from '../../services/user.service';
import { QrCodeService } from '../../services/qr-code.service';
import { TokenService } from '../../services/token.service';
import { SocketIoService } from '../../services/socket-io.service';
import { RunService } from '../../services/run.service';

@Component({
  selector: 'ngx-dashboard-mobile',
  templateUrl: './dashboard-mobile.component.html',
  styleUrls: ['./dashboard-mobile.component.scss']
})
export class DashboardMobileComponent implements OnInit {

  constructor(private translate: TranslateService,
              protected authService: AuthService,
              private router: Router,
              private notificationsService: NotificationsService,
              private userService: UserService,
              private qrCodeService: QrCodeService,
              private tokenService: TokenService,
              private paramsService: ParamsService,
              private socketIoService: SocketIoService,
              private runService: RunService) { }


  redirectDelay: number = 0;
  strategy: string = '';
  fullName: string;

  arbitratedRuns: any = [];
  errors: string[] = [];
  messages: string[] = [];

  user: any = {};

  submitted: boolean = false;
  rememberMe = false;

    ngOnInit() {
      this.fullName = this.userService.getFullName();
      this.user = this.userService.getUserInfo();
      this.socketIoService.connect('/clients');
      this.runService.getArbitratedRunsById(this.user)
      .then(runs => this.arbitratedRuns = runs);
    }

    qrCodeScan() {
      this.qrCodeService.scan()
        .then(data => {
          this.paramsService.setParams(data);
          this.router.navigate(['/mobile', 'run-setting']);
        });
    }

    logout() {
      this.tokenService.setToken('');
      this.router.navigate(['/mobile', 'login']);
    }

    languageSelect(language) {
      if (language === 'italian')
        this.translate.setDefaultLang('it');
      if (language === 'english')
        this.translate.setDefaultLang('en');
    }


}
