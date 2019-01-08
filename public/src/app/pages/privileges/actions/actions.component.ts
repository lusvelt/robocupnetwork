import { MultipleSelectDropdownComponent } from './../../../shared/view-cells/multiple-select-dropdown/multiple-select-dropdown.component';
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
import { Observable } from 'rxjs/Observable';
import { EventEmitter } from 'events';

@Component({
  selector: 'ngx-action',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.scss']
})
export class ActionsComponent implements OnInit {
  showForm: boolean = false;
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

  onButtonClicked() {
    const action: ActionInterface = this.action;
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
    description: {
      title: 'DESCRIPTION',
      type: 'text',
    },
    actionTypes: {
      title: 'ACTION_TYPES',
      type: 'custom',
      renderComponent: MultipleSelectDropdownComponent,
      onComponentInitFunction: (instance) => {
        this.privilegesService.getActionTypes()
          .then(actionTypes => instance.items = actionTypes);

        this.privilegesService.notify('createActionType')
          .subscribe(actionType => instance.items.push(actionType));

        this.privilegesService.notify('editActionType')
          .subscribe(actionType => instance.items.splice(instance.items.findIndex(el => el.id === actionType.id), 1, actionType));

        this.privilegesService.notify('removeActionType')
          .subscribe(actionType => instance.items.splice(instance.items.findIndex(el => el.id === actionType.id), 1));

        instance.parentNotifier.on('change', changed => {
          this.privilegesService.updateSelectedActionTypes(instance.rowData, changed)
            .then(result => this.notificationsService.success('SELECTED_ACTION_TYPES_UPDATE_SUCCEDED'))
            .catch(err => this.notificationsService.error('OPERATION_FAILED_ERROR_MESSAGE'));
        });
      },
      addable: false,
      editable: false
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

  toggleForm() {
    this.showForm = !this.showForm;
  }
}
