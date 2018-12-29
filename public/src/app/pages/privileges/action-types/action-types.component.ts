import { PrivilegesService } from './../../../services/privileges.service';
import { TablesService } from './../../../services/tables.service';
import { LocalDataSource } from 'ng2-smart-table';
import { Component, OnInit } from '@angular/core';
import { SmartTableService } from '../../../@core/data/smart-table.service';
import { standardConfig } from '../../../config/tables.config';
import { NotificationsService } from '../../../services/notifications.service';
import { ModalService } from '../../../services/modal.service';

@Component({
  selector: 'ngx-action-types',
  templateUrl: './action-types.component.html'
})
export class ActionTypesComponent implements OnInit {

  source: LocalDataSource = new LocalDataSource();

  constructor(private tablesService: TablesService,
              private privilegesService: PrivilegesService,
              private notificationsService: NotificationsService,
              private modalService: ModalService) { }

  ngOnInit() {
    this.privilegesService.getActionTypes()
      .then(actionTypes => this.source.load(actionTypes))
      .catch(err => { /* Handle error */ });
  }

  settings = this.tablesService.getSettings(standardConfig, {
    id: {
      title: 'ID',
      type: 'number',
      addable: false,
      editable: false
    },
    name: {
      title: 'Name',
      type: 'string',
    }
  });

  onCreateConfirm(event) {
    event.confirm.resolve();
    this.privilegesService.createActionType(event.newData)
      .then(result => {
        this.source.getAll()
          .then(items => {
            items[0].id = result.id;
            this.source.refresh();
            this.notificationsService.success('ACTION_TYPE_CREATED');
          });
      })
      .catch(err => this.notificationsService.error('OPERATION_FAILED_ERROR_MESSAGE'));
  }

  onEditConfirm(event) {
    event.confirm.resolve();
    this.privilegesService.editActionType(event.newData)
      .then(result => this.notificationsService.success('ACTION_TYPE_UPDATED'))
      .catch(err => this.notificationsService.error('OPERATION_FAILED_ERROR_MESSAGE'));
  }

  onDeleteConfirm(event): void {
    this.modalService.confirm('ARE_YOU_SURE_YOU_WANT_TO_DELETE')
      .then(confirmation => {
        if (confirmation) {
          event.confirm.resolve();
          this.privilegesService.removeActionType(event.data.id)
            .then(result => this.notificationsService.success('DELETE_SUCCEDED'))
            .catch(err => this.notificationsService.error('OPERATION_FAILED_ERROR_MESSAGE'));
        } else {
          event.confirm.reject();
        }
      });
  }
}
