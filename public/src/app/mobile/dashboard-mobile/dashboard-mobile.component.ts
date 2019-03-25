import { merge } from 'rxjs/observable/merge';
import { Observable } from 'rxjs/Observable';
import { debounceTime, distinctUntilChanged, filter, map } from 'rxjs/operators';
import { NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs/Subject';
import { ManifestationsService } from './../../services/manifestations.service';
import { ParamsService } from './../../services/params.service';
import { Component, OnInit, ViewChild } from '@angular/core';
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

  manifestationsList: [];
  @ViewChild('searchManifestationInstance') searchManifestationInstance: NgbTypeahead;
  focus$ = new Subject<string>();
  click$ = new Subject<string>();

  manifestationsFormatter = (value: any) => value.name;

  searchManifestation = (text$: Observable<string>) => {
    const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
    const clicksWithClosedPopup$ = this.click$.pipe(filter(() => !this.searchManifestationInstance.isPopupOpen()));
    const inputFocus$ = this.focus$;

    return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
      map(term => (term === '' ? this.manifestationsList
        : this.manifestationsList.filter((v: any) => v.name.toLowerCase().indexOf(term.toLowerCase()) > -1)).slice(0, 10))
    );
  }

  constructor(private translate: TranslateService,
              public authService: AuthService,
              private router: Router,
              private notificationsService: NotificationsService,
              private userService: UserService,
              private qrCodeService: QrCodeService,
              private tokenService: TokenService,
              private paramsService: ParamsService,
              private socketIoService: SocketIoService,
              private runService: RunService,
              private manifestationsService: ManifestationsService) { }


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
      this.socketIoService.connect('/clients');
      this.manifestationsService.getManifestations()
      .then(manifestations => this.manifestationsList = manifestations);
      this.fullName = this.userService.getFullName();
      this.user = this.userService.getUserInfo();
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

    onManifestationClicked(event: any) {
    const manifestation = event.item;
    this.authService.selectManifestation(manifestation)
      .then(result => this.notificationsService.success('SELECT_MANIFESTATION_SUCCEDED'))
      .catch(err => this.notificationsService.error('OPERATION_FAILED_ERROR_MESSAGE'));
  }



}
