import { ManifestationInterface } from './../../../interfaces/manifestation.interface';
import { DataSource } from './../../../classes/data-source.class';
import { ManifestationsService } from './../../../services/manifestations.service';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { TablesService } from '../../../services/tables.service';
import { TranslateService } from '@ngx-translate/core';
import { NotificationsService } from '../../../services/notifications.service';
import { ModalService } from '../../../services/modal.service';
import { NgbDropdownConfig, NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import * as _ from 'lodash';
import { notAddableConfig } from '../../../config/tables.config';
import { DatePipe } from '@angular/common';
import { Subscription } from 'rxjs/Subscription';
import { SingleDateComponent } from '../../../shared/view-cells/single-date/single-date.component';
import { Subject, Observable, merge } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map } from 'rxjs/operators';
import { PlacesService } from '../../../services/places.service';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'ngx-new-manifestation',
  templateUrl: './new-manifestation.component.html',
  styleUrls: ['./new-manifestation.component.scss']
})
export class NewManifestationComponent implements OnInit, OnDestroy {

  manifestation: any = {
    name: '',
    description: '',
    show: false
  };
  placesList: any [];
  subscriptions: Subscription[] = [];
  source: DataSource = new DataSource();

  @ViewChild('searchPlaceInstance') searchPlaceInstance: NgbTypeahead;
  focus$ = new Subject<string>();
  click$ = new Subject<string>();

  placesFormatter = (value: any) => [value.country, value.region, value.province, value.postalCode, value.city, value.street, value.civicNumber];

  searchPlace = (text$: Observable<string>) => {
    const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
    const clicksWithClosedPopup$ = this.click$.pipe(filter(() => !this.searchPlaceInstance.isPopupOpen()));
    const inputFocus$ = this.focus$;

    return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
      map(term => (term === '' ? this.placesList
        : this.placesList.filter((v: any) => v.street.toLowerCase().indexOf(term.toLowerCase()) > -1)).slice(0, 10))
    );
  }

  constructor(private tablesService: TablesService,
              private translateService: TranslateService,
              private notificationsService: NotificationsService,
              private modalService: ModalService,
              private manifestationsService: ManifestationsService,
              private config: NgbDropdownConfig,
              private placeService: PlacesService,
              private router: Router,
              private datePipe: DatePipe,
              public authService: AuthService) {
                config.autoClose = false;
               }

  ngOnInit() {
    if (this.authService.canDo('getManifestations')) {
    this.manifestationsService.getManifestations()
      .then(manifestations => {
        manifestations.forEach(manifestation => {
          manifestation.Place = manifestation.Place.street + ' ' + manifestation.Place.civicNumber + ', ' + manifestation.Place.city + ' ' + manifestation.Place.postalCode + ', ' + manifestation.Place.country;
        });
        this.source.load(manifestations);
      })
      .catch(err => this.notificationsService.error('COULD_NOT_LOAD_DATA'));
    } else {
      this.notificationsService.error('UNAUTHORIZED');
    }

    this.subscriptions.push(
      this.manifestationsService.notify('createManifestation')
      .subscribe(manifestation => this.source.insert(manifestation)));

    this.subscriptions.push(
      this.manifestationsService.notify('editManifestation')
      .subscribe(manifestation => this.source.edit(manifestation)));

    this.subscriptions.push(
      this.manifestationsService.notify('removeManifestation')
      .subscribe(manifestation => this.source.delete(manifestation)));

      this.placeService.getPlaces()
    .then(places => this.placesList = places)
    .catch(err => this.notificationsService.error('COULD_NOT_LOAD_DATA'));

    this.getNotifiedForPlaces(this.manifestation.places);
  }

  getNotifiedForPlaces(placesArray: any[]) {
    this.placeService.notify('createPlace')
    .subscribe(place => placesArray.push(place));

    this.placeService.notify('editPlace')
      .subscribe(place => placesArray.splice(placesArray.findIndex(el => el.id === place.id), 1, place));

    this.placeService.notify('removePlace')
      .subscribe(place => placesArray.splice(placesArray.findIndex(el => el.id === place.id), 1));
  }

  onButtonClicked() {
    if (this.authService.canDo('createManifestation')) {
      const manifestation: ManifestationInterface = _.cloneDeep(this.manifestation);
      const place = manifestation.place;

      manifestation.start = new Date(this.manifestation.start);
      manifestation.end = new Date(this.manifestation.end);
      if (manifestation.name !== '' && manifestation.description !== '') {
      this.manifestationsService.createManifestation(manifestation)
        .then(_manifestation => {
          _manifestation.Place = place.street + ' ' + place.civicNumber + ', ' + place.city + ' ' + place.postalCode + ', ' + place.country;
          // _manifestation.placeId = place.id;
          this.notificationsService.success('MANIFESTATION_CREATED');
          this.source.insert(_manifestation);
          this.manifestation.show = false;
        });
    } else {
      this.notificationsService.error('YOU_SHOULD_INSERT_DATA');
    }
    } else {
      this.notificationsService.error('UNAUTHORIZED');
    }
  }

  settings = this.tablesService.getSettings(notAddableConfig, {
    id: {
      title: 'ID',
      type: 'number',
      addable: false,
      editable: false
    },
    name: {
      title: 'NAME',
      type: 'text',
    },
    description: {
      title: 'DESCRIPTION',
      type: 'text',
    },
    start: {
      title: 'START',
      type: 'custom',
      editable: false,
      renderComponent: SingleDateComponent,
      onComponentInitFunction: (instance) => {
        instance.internalKey = 'start';
        instance.parentNotifier.on('change', changed => {
          this.manifestationsService.updateStart(instance.rowData, changed)
          .then(result => this.notificationsService.success('START_UPDATE_SUCCEDED'))
          .catch(err => this.notificationsService.error('OPERATION_FAILED_ERROR_MESSAGE'));
        });
      }
    },
    end: {
      title: 'END',
      type: 'custom',
      editable: false,
      renderComponent: SingleDateComponent,
      onComponentInitFunction: (instance) => {
        instance.internalKey = 'end';
        instance.parentNotifier.on('change', changed => {
          this.manifestationsService.updateEnd(instance.rowData, changed)
          .then(result => this.notificationsService.success('END_UPDATE_SUCCEDED'))
          .catch(err => this.notificationsService.error('OPERATION_FAILED_ERROR_MESSAGE'));
        });
      }
    },
    Place: {
      title: 'PLACE',
      type: 'text',
      addable: false,
      editable: false
    }
  });

  onEditConfirm(event) {
    if (this.authService.canDo('editManifestation')) {
    event.confirm.resolve();
    this.manifestationsService.editManifestation(event.newData)
      .then(result => this.notificationsService.success('MANIFESTATION_UPDATED'))
      .catch(err => this.notificationsService.error('OPERATION_FAILED_ERROR_MESSAGE'));
    } else {
      this.notificationsService.error('UNAUTHORIZED');
    }
  }

  onDeleteConfirm(event): void {
    if (this.authService.canDo('removeManifestation')) {
      this.modalService.confirm('ARE_YOU_SURE_YOU_WANT_TO_DELETE')
        .then(confirmation => {
          if (confirmation) {
            event.confirm.resolve();
            this.manifestationsService.removeManifestation(event.data)
              .then(result => this.notificationsService.success('DELETE_SUCCEDED'))
              .catch(err => this.notificationsService.error('OPERATION_FAILED_ERROR_MESSAGE'));
          } else {
            event.confirm.reject();
          }
        });
      } else {
        this.notificationsService.error('UNAUTHORIZED');
      }
  }

  toggleForm() {
    this.manifestation.show = !this.manifestation.show;
  }
  onPlaceClicked(event: any) {

    this.manifestation.place = event.item;
  }
  newPlaceClicked() {
    this.router.navigate(['/pages', 'places', 'manage-place']);
  }
  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

}
