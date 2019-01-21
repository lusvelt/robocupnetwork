import { Component, OnInit } from '@angular/core';
import { TablesService } from './../../../services/tables.service';
import { notAddableConfig } from '../../../config/tables.config';
import { NotificationsService } from '../../../services/notifications.service';
import { ModalService } from './../../../services/modal.service';
import { DataSource } from '../../../classes/data-source.class';
import { SchoolService } from './../../../services/schools.service';

@Component({
  selector: 'ngx-manage-school',
  templateUrl: './manage-school.component.html'
})
export class ManageSchoolComponent implements OnInit {

  source: DataSource = new DataSource();

  constructor(
    private tablesService: TablesService,
    private notificationsService: NotificationsService,
    private modalService: ModalService,
    private schoolService: SchoolService
  ) {}

  ngOnInit() {
    this.schoolService.getSchools()
    .then(users => this.source.load(users))
    .catch(err => this.notificationsService.error('COULD_NOT_LOAD_DATA'));

    this.schoolService.notify('createSchool')
    .subscribe(user => this.source.insert(user));

    this.schoolService.notify('editSchool')
    .subscribe(user => this.source.edit(user));

    this.schoolService.notify('removeSchool')
    .subscribe(user => this.source.delete(user));
  }

  settings = this.tablesService.getSettings(notAddableConfig, {
    id: {
      title: 'ID',
      type: 'number',
      addable: false,
      editable: false
    },
    name: {
      title: 'SCHOOL',
      type: 'text',
    }

  });

  onEditConfirm(event) {
    event.confirm.resolve()/*;
    this.privilegesService.editUser(event.newData)*/
      .then(result => this.notificationsService.success('SCHOOL_UPDATED'))
      .catch(err => this.notificationsService.error('OPERATION_FAILED_ERROR_MESSAGE'));
  }

  onDeleteConfirm(event): void {
    this.modalService.confirm('ARE_YOU_SURE_YOU_WANT_TO_DELETE')
      .then(confirmation => {
        if (confirmation) {
          event.confirm.resolve()/*;
          this.privilegesService.removeActionType(event.data)*/
            .then(result => this.notificationsService.success('DELETE_SUCCEDED'))
            .catch(err => this.notificationsService.error('OPERATION_FAILED_ERROR_MESSAGE'));
        } else {
          event.confirm.reject();
        }
      });
    }

}
