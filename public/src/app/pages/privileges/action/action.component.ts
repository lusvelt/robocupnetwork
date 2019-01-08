import { Component, OnInit } from '@angular/core';
import { ActionInterface } from '../../../interfaces/action.interface';
import { SmartTableService } from '../../../@core/data/smart-table.service';
import { LocalDataSource } from 'ng2-smart-table';
import { TranslateService } from '@ngx-translate/core';
import { PrivilegesService } from '../../../services/privileges.service';
import { ModalService } from '../../../services/modal.service';
import { NotificationsService } from '../../../services/notifications.service';
import { TablesService } from '../../../services/tables.service';
import { DataSource } from '../../../classes/data-source.class';
import { standardConfig } from '../../../config/tables.config';

@Component({
  selector: 'ngx-action',
  templateUrl: './action.component.html',
  styleUrls: ['./action.component.scss']
})
export class ActionComponent implements OnInit {

  source: DataSource= new DataSource();
  action: any = {};
  actionChoose: any = {};
  constructor(private tablesService: TablesService,
              private translateService: TranslateService,
              private privilegesService: PrivilegesService,
              private notificationsService: NotificationsService,
              private modalService: ModalService) {
  }

  ngOnInit() {
    this.privilegesService.getActions()
    .then(action => this.source.load(action))
    .catch(err => this.notificationsService.error('COULD_NOT_LOAD_DATA'));

    this.privilegesService.notify('createAction')
      .subscribe(action => this.source.insert(action));

    this.privilegesService.notify('editAction')
      .subscribe(action => this.source.edit(action));

    this.privilegesService.notify('removeAction')
      .subscribe(action => this.source.delete(action));
  }

  actionType: string[] = ['READ', 'DELETE', 'EDIT' ];

  onButtonClicked() {
    const action: ActionInterface = this.action;
  }

  settings= this.tablesService.getSettings(standardConfig,{
    id: {
      title: 'ID',
      type: 'number',
      addable: false,
      editable: false
    },
    name: {
      title: 'NAME',
      type: 'string',
    },
    description: {
      title: 'DESCRIPTION',
      type: 'string',
    }
  });

  onEditConfirm(event) {
    event.confirm.resolve();
    this.privilegesService.editAction(event.newData)
      .then(result => this.notificationsService.success('ACTION_UPDATED'))
      .catch(err => this.notificationsService.error('OPERATION_FAILED_ERROR_MESSAGE'));
  }

  onDeleteConfirm(event): void {
    this.modalService.confirm('ARE_YOU_SURE_YOU_WANT_TO_DELETE')
      .then(confirmation => {
        if (confirmation) {
          event.confirm.resolve();
          this.privilegesService.removeAction(event.data)
            .then(result => this.notificationsService.success('DELETE_SUCCEDED'))
            .catch(err => this.notificationsService.error('OPERATION_FAILED_ERROR_MESSAGE'));
        } else {
          event.confirm.reject();
        }
      });
  }
}
