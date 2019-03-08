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
              private socketIoService: SocketIoService) { }


  redirectDelay: number = 0;
  strategy: string = '';
  fullName: string;

  arbitratedRuns: { name: string, points: string }[] = [
    { name: 'Fenix', points: '121 pt' },
    { name: 'Jamil', points: '20 pt' },
    { name: 'Elettroncica 1', points: '40 pt' },
    { name: 'Erminio', points: '22 pt' },
    { name: 'Dellemonudo', points: '32 pt' },
  ];
  errors: string[] = [];
  messages: string[] = [];

  user: any = {};

  submitted: boolean = false;
  rememberMe = false;

    ngOnInit() {
      this.fullName = this.userService.getFullName();
      this.socketIoService.connect('/clients');
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


}
