import { NotificationsService } from './../../../services/notifications.service';
import { MultipleSelectDropdownComponent } from './../../../shared/view-cells/multiple-select-dropdown/multiple-select-dropdown.component';
import { Component, OnInit } from '@angular/core';
import { ActionInterface } from '../../../interfaces/action.interface';
import { TranslateService } from '@ngx-translate/core';
import { PrivilegesService } from '../../../services/privileges.service';
import { ModalService } from '../../../services/modal.service';
import { NotificationsService } from '../../../services/notifications.service';
import { TablesService } from '../../../services/tables.service';
import { DataSource } from '../../../classes/data-source.class';
import { notAddableConfig } from '../../../config/tables.config';
import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';
import * as _ from 'lodash';

@Component({
  selector: 'ngx-action',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.scss']
})
export class ActionsComponent implements OnInit {
  action: any = {
    name: '',
    description: '',
    actionTypes: [],
    show: false
  };

  source: DataSource= new DataSource();
  actionChoose: any = {};

  constructor(private tablesService: TablesService,
              private translateService: TranslateService,
              private privilegesService: PrivilegesService,
              private notificationsService: NotificationsService,
              private modalService: ModalService,
              private config: NgbDropdownConfig) {
                config.autoClose = false;
  }

  ngOnInit() {
    this.privilegesService.getActions()
    .then(actions => this.source.load(actions))
    .catch(err => this.notificationsService.error('COULD_NOT_LOAD_DATA'));

    this.privilegesService.notify('createAction')
      .subscribe(action => this.source.insert(action));

    this.privilegesService.notify('editAction')
      .subscribe(action => this.source.edit(action));

    this.privilegesService.notify('removeAction')
      .subscribe(action => this.source.delete(action));

    this.privilegesService.getActionTypes()
      .then(actionTypes => this.action.actionTypes = actionTypes);

    this.getNotifiedForActionTypes(this.action.actionTypes);
  }

  getNotifiedForActionTypes(actionTypesArray: any[]) {
    this.privilegesService.notify('createActionType')
      .subscribe(actionType => actionTypesArray.push(actionType));

    this.privilegesService.notify('editActionType')
      .subscribe(actionType => actionTypesArray.splice(actionTypesArray.findIndex(el => el.id === actionType.id), 1, actionType));

    this.privilegesService.notify('removeActionType')
      .subscribe(actionType => actionTypesArray.splice(actionTypesArray.findIndex(el => el.id === actionType.id), 1));
  }

  onButtonClicked() {
    const action: ActionInterface = _.cloneDeep(this.action);
    action.actionTypes = action.actionTypes.filter((actionType: any) => actionType.selected);
    this.privilegesService.createAction(action)
      .then(_action => {
        this.notificationsService.success('ACTION_CREATED');
        this.source.insert(_action);
        this.action.show = false;
      });
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
    actionTypes: {
      title: 'ACTION_TYPES',
      type: 'custom',
      // filter: false,
      renderComponent: MultipleSelectDropdownComponent,
      onComponentInitFunction: (instance) => {
        instance.internalArrayKey = 'ActionTypes';

        this.privilegesService.getActionTypes()
          .then(actionTypes => instance.parentNotifier.emit('items', actionTypes));

        this.getNotifiedForActionTypes(instance.items);

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
    this.action.show = !this.action.show;
  }
}
