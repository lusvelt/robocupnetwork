import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { Router } from '@angular/router';
import { AuthService } from '../../../../services/auth.service';
import { NotificationsService } from '../../../../services/notifications.service';

import 'rxjs/add/operator/catch';
import { UserService } from './../../../../services/user.service';
@Component({
  selector: 'ngx-mobiledashboard',
  templateUrl: './mobiledashboard.component.html',
  styleUrls: ['./mobiledashboard.component.scss']
})
export class MobiledashboardComponent implements OnInit {

  constructor(private translate: TranslateService,
              private authService: AuthService,
              private router: Router,
              private notificationsService: NotificationsService,
              private userService: UserService) { }


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
    }


}
