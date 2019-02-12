import { Component, OnInit, OnDestroy } from '@angular/core';
import { notAddableConfig } from '../../../config/tables.config';
import { TablesService } from '../../../services/tables.service';
import { TranslateService } from '@ngx-translate/core';

import { NotificationsService } from '../../../services/notifications.service';
import { ModalService } from '../../../services/modal.service';
import { DataSource } from '../../../classes/data-source.class';
import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';
import { PlacesService } from '../../../services/places.service';
import { PlaceInterface } from '../../../interfaces/place.interface';
import * as _ from 'lodash';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-manage-place',
  templateUrl: './manage-place.component.html',
  styleUrls: ['./manage-place.component.scss']
})
export class ManagePlaceComponent implements OnInit, OnDestroy {

  place: any = {
    country: '',
    region: '',
    province: '',
    postalCode: '',
    city: '',
    civicNumber: '',
    street: '',
    show: false
  };

  subscriptions: Subscription[] = [];
  source: DataSource= new DataSource();

  constructor(private tablesService: TablesService,
    private translateService: TranslateService,
    private placesService: PlacesService,
    private notificationsService: NotificationsService,
    private modalService: ModalService,
    private router: Router,
    private config: NgbDropdownConfig) {
      config.autoClose = false;
}

  ngOnInit() {
    this.placesService.getPlaces()
    .then(places => this.source.load(places))
    .catch(err => this.notificationsService.error('COULD_NOT_LOAD_DATA'));

    this.subscriptions.push(
    this.placesService.notify('createPlace')
      .subscribe(place => this.source.insert(place)));

    this.subscriptions.push(
      this.placesService.notify('editPlace')
      .subscribe(place => this.source.edit(place)));

    this.subscriptions.push(
      this.placesService.notify('removePlace')
      .subscribe(place => this.source.delete(place)));
  }

  onButtonClicked() {
    const place: PlaceInterface = _.cloneDeep(this.place);
    this.placesService.createPlace(place)
      .then(_place => {
        this.notificationsService.success('PLACE_CREATED');
        this.source.insert(_place);
        this.place.show = false;
      });
  }
    settings = this.tablesService.getSettings(notAddableConfig, {
    id: {
      title: 'ID',
      type: 'number',
      addable: false,
      editable: false
    },
    country: {
      title: 'COUNTRY',
      type: 'text',
    },
    region: {
      title: 'REGION',
      type: 'text',
    },
    province: {
      title: 'PROVINCE',
      type: 'text',
    },
    postalCode: {
      title: 'POSTAL_CODE',
      type: 'text',
    },
    city: {
      title: 'CITY',
      type: 'text',
    },
    civicNumber: {
      title: 'CIVIC_NUMBER',
      type: 'text',
    },
    street: {
      title: 'STREET',
      type: 'text',
    }
  });

  onEditConfirm(event) {
    event.confirm.resolve();
    this.placesService.editPlace(event.newData)
      .then(result => this.notificationsService.success('PLACE_UPDATED'))
      .catch(err => this.notificationsService.error('OPERATION_FAILED_ERROR_MESSAGE'));
  }

  onDeleteConfirm(event): void {
    this.modalService.confirm('ARE_YOU_SURE_YOU_WANT_TO_DELETE')
      .then(confirmation => {
        if (confirmation) {
          event.confirm.resolve();
          this.placesService.removePlace(event.data)
            .then(result => this.notificationsService.success('DELETE_SUCCEDED'))
            .catch(err => this.notificationsService.error('OPERATION_FAILED_ERROR_MESSAGE'));
        } else {
          event.confirm.reject();
        }
      });
  }

  toggleForm() {
    this.place.show = !this.place.show;
  }
  backToSchoolClicked() {
    this.router.navigate(['/pages', 'schools', 'manage']);
  }
  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
