import { ManifestationsService } from './../../services/manifestations.service';
import { Observable } from 'rxjs/Observable';
import { Component, OnDestroy, ViewChild, OnInit } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { takeWhile, debounceTime, distinctUntilChanged, filter, map } from 'rxjs/operators' ;

import { Subject } from 'rxjs/Subject';
import { NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import { merge } from 'rxjs';
import { NotificationsService } from '../../services/notifications.service';
import { AuthService } from '../../services/auth.service';

interface CardSettings {
  title: string;
  iconClass: string;
  type: string;
}


@Component({
  selector: 'ngx-dashboard',
  styleUrls: ['./dashboard.component.scss'],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  runs = ['miao', 'mieo'];
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

  constructor(private manifestationsService: ManifestationsService,
              public authService: AuthService,
              private notificationsService: NotificationsService) { }

  ngOnInit() {
    this.manifestationsService.getManifestations()
      .then(manifestations => this.manifestationsList = manifestations);
  }

  onManifestationClicked(event: any) {
    const manifestation = event.item;
    this.authService.selectManifestation(manifestation)
      .then(result => this.notificationsService.success('SELECT_MANIFESTATION_SUCCEDED'))
      .catch(err => this.notificationsService.error('OPERATION_FAILED_ERROR_MESSAGE'));
  }




/*
  private alive = true;

  lightCard: CardSettings = {
    title: 'Light',
    iconClass: 'nb-lightbulb',
    type: 'primary',
  };
  rollerShadesCard: CardSettings = {
    title: 'Roller Shades',
    iconClass: 'nb-roller-shades',
    type: 'success',
  };
  wirelessAudioCard: CardSettings = {
    title: 'Wireless Audio',
    iconClass: 'nb-audio',
    type: 'info',
  };
  coffeeMakerCard: CardSettings = {
    title: 'Coffee Maker',
    iconClass: 'nb-coffee-maker',
    type: 'warning',
  };

  statusCards: string;

  commonStatusCardsSet: CardSettings[] = [
    this.lightCard,
    this.rollerShadesCard,
    this.wirelessAudioCard,
    this.coffeeMakerCard,
  ];

  statusCardsByThemes: {
    default: CardSettings[];
    cosmic: CardSettings[];
    corporate: CardSettings[];
  } = {
    default: this.commonStatusCardsSet,
    cosmic: this.commonStatusCardsSet,
    corporate: [
      {
        ...this.lightCard,
        type: 'warning',
      },
      {
        ...this.rollerShadesCard,
        type: 'primary',
      },
      {
        ...this.wirelessAudioCard,
        type: 'danger',
      },
      {
        ...this.coffeeMakerCard,
        type: 'secondary',
      },
    ],
  };

  constructor(private themeService: NbThemeService) {
    this.themeService.getJsTheme()
      .pipe(takeWhile(() => this.alive))
      .subscribe(theme => {
        this.statusCards = this.statusCardsByThemes[theme.name];
    });
  }

  ngOnDestroy() {
    this.alive = false;
  }
  */
}
