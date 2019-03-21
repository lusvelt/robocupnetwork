import { notificationsConfig } from './../../../config/notifications.config';
import { NotificationsService } from './../../../services/notifications.service';
import { MultipleSelectDropdownComponent } from './../../../shared/view-cells/multiple-select-dropdown/multiple-select-dropdown.component';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActionInterface } from '../../../interfaces/action.interface';
import { TranslateService } from '@ngx-translate/core';
import { PrivilegesService } from '../../../services/privileges.service';
import { ModalService } from '../../../services/modal.service';
import { TablesService } from '../../../services/tables.service';
import { DataSource } from '../../../classes/data-source.class';
import { notAddableConfig } from '../../../config/tables.config';
import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';
import * as _ from 'lodash';
import { Subscription } from 'rxjs';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { CheckboxComponent } from '../../../shared/view-cells/checkbox/checkbox.component';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'ngx-action',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.scss']
})
export class ActionsComponent implements OnInit, OnDestroy {
  action: any = {
    name: '',
    description: '',
    alias: '',
    actionTypes: [],
    modules: [],
    dependsOnManifestation: false,
    show: false
  };
  subscriptions: Subscription[] = [];
  source: DataSource= new DataSource();
  actionChoose: any = {};

  constructor(private tablesService: TablesService,
              private translateService: TranslateService,
              private privilegesService: PrivilegesService,
              private notificationsService: NotificationsService,
              private modalService: ModalService,
              public authService: AuthService,
              private config: NgbDropdownConfig) {
                config.autoClose = false;
  }

  ngOnInit() {
    if (this.authService.canDo('getActions')) {
    this.privilegesService.getActions()
    .then(actions => this.source.load(actions))
    .catch(err => this.notificationsService.error('COULD_NOT_LOAD_DATA'));
  }else {
    this.notificationsService.error('UNAUTHORIZED');
  }

    this.subscriptions.push(
    this.privilegesService.notify('createAction')
      .subscribe(action => this.source.insert(action)));

    this.subscriptions.push(
      this.privilegesService.notify('editAction')
      .subscribe(action => this.source.edit(action)));

    this.subscriptions.push(
      this.privilegesService.notify('removeAction')
      .subscribe(action => this.source.delete(action)));

    this.privilegesService.getActionTypes()
      .then(actionTypes => this.action.actionTypes = actionTypes);

    this.privilegesService.getModules()
      .then(result => this.action.modules = result);

    this.getNotifiedForActionTypes(this.action.actionTypes);
    this.getNotifiedForModules(this.action.modules);
  }

  getNotifiedForActionTypes(actionTypesArray: any[]) {
    this.subscriptions.push(
    this.privilegesService.notify('createActionType')
      .subscribe(actionType => actionTypesArray.push(actionType)));

    this.subscriptions.push(
      this.privilegesService.notify('editActionType')
      .subscribe(actionType => actionTypesArray.splice(actionTypesArray.findIndex(el => el.id === actionType.id), 1, actionType)));

    this.subscriptions.push(
      this.privilegesService.notify('removeActionType')
      .subscribe(actionType => actionTypesArray.splice(actionTypesArray.findIndex(el => el.id === actionType.id), 1)));
  }

  getNotifiedForModules(modulesArray: any[]) {
    this.subscriptions.push(
      this.privilegesService.notify('createModule')
        .subscribe(mod => modulesArray.push(mod)));

    this.subscriptions.push(
      this.privilegesService.notify('editModule')
        .subscribe(mod => modulesArray.splice(modulesArray.findIndex(el => el.id === mod.id), 1, mod)));

    this.subscriptions.push(
      this.privilegesService.notify('removeModule')
        .subscribe(mod => modulesArray.splice(modulesArray.findIndex(el => el.id === mod.id), 1)))
      ;
  }

  onButtonClicked() {
    if (this.authService.canDo('createAction')) {
    const action: ActionInterface = _.cloneDeep(this.action);
    action.actionTypes = action.actionTypes.filter((actionType: any) => actionType.selected);
    action.modules = action.modules.filter((mod: any) => mod.selected);
    if (action.name !== '' && action.description !== '') {
    this.privilegesService.createAction(action)
      .then(_action => {
        this.notificationsService.success('ACTION_CREATED');
        this.source.insert(_action);
        this.action.show = false;
      });
    } else {
      this.notificationsService.error('YOU_SHOULD_INSERT_DATA');
    }
  }else {
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
    alias: {
      title: 'ALIAS',
      type: 'text'
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
    },
    modules: {
      title: 'MODULES',
      type: 'custom',
      renderComponent: MultipleSelectDropdownComponent,
      onComponentInitFunction: (instance) => {
        instance.internalArrayKey = 'Modules';

        this.privilegesService.getModules()
          .then(mod => instance.parentNotifier.emit('items', mod));

        this.getNotifiedForModules(instance.items);

        instance.parentNotifier.on('change', changed => {
          this.privilegesService.updateSelectedModules(instance.rowData, changed)
            .then(result => this.notificationsService.success('SELECTED_MODULES_UPDATE_SUCCEDED'))
            .catch(err => this.notificationsService.error('OPERATION_FAILED_ERROR_MESSAGE'));
        });
      }
    },
    dependsOnManifestation: {
      title: 'DEPENDS_ON_MANIFESTATION',
      type: 'custom',
      renderComponent: CheckboxComponent,
      onComponentInitFunction: (instance) => {
        instance.parentNotifier.on('change', changed => {
          this.privilegesService.updateActionManifestationDependency(instance.rowData, changed)
            .then(result => this.notificationsService.success('MANIFESTATION_DEPENDENCY_UPDATE_SUCCEDED'))
            .catch(err => this.notificationsService.error('OPERATION_FAILED_ERROR_MESSAGE'));
        });
      }
    }
  });

  onEditConfirm(event) {
    if (this.authService.canDo('editAction')) {
    event.confirm.resolve();
    this.privilegesService.editAction(event.newData)
      .then(result => this.notificationsService.success('ACTION_UPDATED'))
      .catch(err => this.notificationsService.error('OPERATION_FAILED_ERROR_MESSAGE'));
    } else {
      this.notificationsService.error('YOU_SHOULD_INSERT_DATA');
    }
  }

  onDeleteConfirm(event): void {
    if (this.authService.canDo('removeAction')) {
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
    } else {
      this.notificationsService.error('YOU_SHOULD_INSERT_DATA');
    }
  }

  toggleForm() {
    this.action.show = !this.action.show;
  }
  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
