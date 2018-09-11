import { NbAuthService } from '@nebular/auth';
import { TranslateService } from '@ngx-translate/core';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-logout',
  templateUrl: './logout.component.html',
})
export class LogoutComponent implements OnInit {

  redirectDelay: number = 2000;
  strategy: string = '';

  constructor(protected service: NbAuthService, private translate: TranslateService) { }

  ngOnInit(): void {
    this.logout(this.strategy);
  }

  logout(strategy: string): void { }

}
