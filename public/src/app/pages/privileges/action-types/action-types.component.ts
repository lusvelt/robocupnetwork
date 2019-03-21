import { DataSource } from './../../../classes/data-source.class';
import { PrivilegesService } from './../../../services/privileges.service';
import { TablesService } from './../../../services/tables.service';
import { LocalDataSource } from 'ng2-smart-table';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { SmartTableService } from '../../../@core/data/smart-table.service';
import { standardConfig } from '../../../config/tables.config';
import { NotificationsService } from '../../../services/notifications.service';
import { ModalService } from '../../../services/modal.service';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { AuthService } from './../../../services/auth.service';

@Component({
  selector: 'ngx-action-types',
  templateUrl: './action-types.component.html'
})
export class ActionTypesComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];
  source: DataSource = new DataSource();

  constructor(private tablesService: TablesService,
              private privilegesService: PrivilegesService,
              private notificationsService: NotificationsService,
              private modalService: ModalService,
              public authService: AuthService,
              private translateService: TranslateService) { }

  ngOnInit() {
    if (this.authService.canDo('getActionTypes')) {
    this.privilegesService.getActionTypes()
      .then(actionTypes => this.source.load(actionTypes))
      .catch(err => this.notificationsService.error('COULD_NOT_LOAD_DATA'));
    }else {
      this.notificationsService.error('UNAUTHORIZED');
    }

    this.subscriptions.push(
      this.privilegesService.notify('createActionType')
      .subscribe(actionType => this.source.insert(actionType)));

    this.subscriptions.push(
      this.privilegesService.notify('editActionType')
      .subscribe(actionType => this.source.edit(actionType)));

    this.subscriptions.push(
      this.privilegesService.notify('removeActionType')
      .subscribe(actionType => this.source.delete(actionType)));
  }

  settings = this.tablesService.getSettings(standardConfig, {
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
    alias: {
      title: 'ALIAS',
      type: 'alias'
    }
  });

  onCreateConfirm(event) {
    if (this.authService.canDo('createActionType')) {
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
    }else {
      this.notificationsService.error('UNAUTHORIZED');
    }
  }

  onEditConfirm(event) {
    if (this.authService.canDo('editActionType')) {
    event.confirm.resolve();
    this.privilegesService.editActionType(event.newData)
      .then(result => this.notificationsService.success('ACTION_TYPE_UPDATED'))
      .catch(err => this.notificationsService.error('OPERATION_FAILED_ERROR_MESSAGE'));
    }else {
      this.notificationsService.error('UNAUTHORIZED');
    }
  }

  onDeleteConfirm(event): void {
    if (this.authService.canDo('removeActionType')) {
    this.modalService.confirm('ARE_YOU_SURE_YOU_WANT_TO_DELETE')
      .then(confirmation => {
        if (confirmation) {
          event.confirm.resolve();
          this.privilegesService.removeActionType(event.data)
            .then(result => this.notificationsService.success('DELETE_SUCCEDED'))
            .catch(err => this.notificationsService.error('OPERATION_FAILED_ERROR_MESSAGE'));
        } else {
          event.confirm.reject();
        }
      });
    }else {
      this.notificationsService.error('UNAUTHORIZED');
    }
  }
  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
