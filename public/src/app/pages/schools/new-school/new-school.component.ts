import { PlacesService } from './../../../services/places.service';
import { MultipleSelectDropdownComponent } from './../../../shared/view-cells/multiple-select-dropdown/multiple-select-dropdown.component';
import { DataSource } from './../../../classes/data-source.class';
import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { TablesService } from '../../../services/tables.service';
import { NotificationsService } from '../../../services/notifications.service';
import { ModalService } from '../../../services/modal.service';
import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';
import { SchoolService } from '../../../services/schools.service';
import { notAddableConfig } from '../../../config/tables.config';
import { SchoolInterface } from '../../../interfaces/school.interface';
import * as _ from 'lodash';

@Component({
  selector: 'ngx-new-school',
  templateUrl: './new-school.component.html',
  styleUrls: ['./new-school.component.scss']
})
export class NewSchoolComponent implements OnInit {

  school: any = {
    name: '',
    show: false,
    places: []
  };

  source: DataSource = new DataSource();

  constructor(private tablesService: TablesService,
              private translateService: TranslateService,
              private notificationsService: NotificationsService,
              private modalService: ModalService,
              private config: NgbDropdownConfig,
              private schoolService: SchoolService,
              private placeService: PlacesService) {
    }

  ngOnInit() {
    this.schoolService.getSchools()
      .then(school => {
        this.source.load(school);
      })
      .catch(err => this.notificationsService.error('COULD_NOT_LOAD_DATA'));

    this.schoolService.notify('createSchool')
      .subscribe(school => this.source.insert(school));

    this.schoolService.notify('editSchool')
      .subscribe(school => this.source.edit(school));

    this.schoolService.notify('removeSchool')
      .subscribe(school => this.source.delete(school));

    this.placeService.getPlaces()
    .then(places => this.school.places = places)
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
    school.places = school.places.filter((places: any) => places.selected);
    if (school.places.length === 1) {
      this.schoolService.createSchool(school)
      .then(_school => {
        this.notificationsService.success('SCHOOL_CREATED');
        this.source.insert(_school);
        this.school.show = false;
      });
    }else {
      this.notificationsService.error('SELECTED_MORE_PLACES');
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
}
