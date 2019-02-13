import { PlacesService } from '../../../services/places.service';
import { MultipleSelectDropdownComponent } from '../../../shared/view-cells/multiple-select-dropdown/multiple-select-dropdown.component';
import { DataSource } from '../../../classes/data-source.class';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { TablesService } from '../../../services/tables.service';
import { NotificationsService } from '../../../services/notifications.service';
import { ModalService } from '../../../services/modal.service';
import { Observable } from 'rxjs/Observable';
import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';
import { SchoolService } from '../../../services/schools.service';
import { notAddableConfig } from '../../../config/tables.config';
import { SchoolInterface } from '../../../interfaces/school.interface';
import * as _ from 'lodash';
import { Router } from '@angular/router';
import { merge } from 'rxjs';
import { Subject } from 'rxjs/Subject';
import { NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import { takeWhile, debounceTime, distinctUntilChanged, filter, map } from 'rxjs/operators' ;
import { Subscription } from 'rxjs/Subscription';


@Component({
  selector: 'ngx-manage-school',
  templateUrl: './manage-school.component.html',
  styleUrls: ['./manage-school.component.scss']
})
export class ManageSchoolComponent implements OnInit, OnDestroy {

  school: any = {
    name: '',
    show: false,
    places: []
  };

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
      map(term => (term === '' ? this.school.place
        : this.school.place.filter((v: any) => v.street.toLowerCase().indexOf(term.toLowerCase()) > -1)).slice(0, 10))
    );
  }

  constructor(private tablesService: TablesService,
              private translateService: TranslateService,
              private notificationsService: NotificationsService,
              private modalService: ModalService,
              private config: NgbDropdownConfig,
              private schoolService: SchoolService,
              private placeService: PlacesService,
              private router: Router) {
    }

  ngOnInit() {
    this.schoolService.getSchools()
      .then(school => {
        this.source.load(school);
      })
      .catch(err => this.notificationsService.error('COULD_NOT_LOAD_DATA'));
    this.subscriptions.push(
      this.schoolService.notify('createSchool')
      .subscribe(school => this.source.insert(school)));

    this.subscriptions.push(
      this.schoolService.notify('editSchool')
      .subscribe(school => this.source.edit(school)));

    this.subscriptions.push(
      this.schoolService.notify('removeSchool')
      .subscribe(school => this.source.delete(school)));

    this.placeService.getPlaces()
    .then(places => this.school.place = places)
    .catch(err => this.notificationsService.error('COULD_NOT_LOAD_DATA'));

    this.getNotifiedForPlaces(this.school.places);
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
    const school: SchoolInterface = _.cloneDeep(this.school);
    if (school.places && school.name !== '') {
      this.schoolService.createSchool(school)
      .then(_school => {
        this.notificationsService.success('SCHOOL_CREATED');
        this.source.insert(_school);
        this.school.show = false;
      });
    }else {
      this.notificationsService.error('YOU_SHOULD_INSERT_DATA');
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
    }
  });


  onEditConfirm(event) {
    event.confirm.resolve();
    this.schoolService.editSchool(event.newData)
      .then(result => this.notificationsService.success('SCHOOL_UPDATED'))
      .catch(err => this.notificationsService.error('OPERATION_FAILED_ERROR_MESSAGE'));
  }

  onDeleteConfirm(event): void {
    this.modalService.confirm('ARE_YOU_SURE_YOU_WANT_TO_DELETE')
      .then(confirmation => {
        if (confirmation) {
          event.confirm.resolve();
          this.schoolService.removeSchool(event.data)
            .then(result => this.notificationsService.success('DELETE_SUCCEDED'))
            .catch(err => this.notificationsService.error('OPERATION_FAILED_ERROR_MESSAGE'));
        } else {
          event.confirm.reject();
        }
      });
  }

  toggleForm() {
    this.school.show = !this.school.show;
  }
  onPlaceClicked(event: any) {
    const place = event.item;
  }
  newPlaceClicked() {
    this.router.navigate(['/pages', 'places', 'manage-place']);
  }
  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
