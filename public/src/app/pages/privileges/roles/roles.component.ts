import { filter } from 'rxjs/operators';
import { CheckboxComponent } from './../../../shared/view-cells/checkbox/checkbox.component';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { SmartTableService } from '../../../@core/data/smart-table.service';
import { RoleInterface } from '../../../interfaces/role.interface';
import { TranslateService } from '@ngx-translate/core';
import { DataSource } from '../../../classes/data-source.class';
import { TablesService } from '../../../services/tables.service';
import { PrivilegesService } from '../../../services/privileges.service';
import { NotificationsService } from '../../../services/notifications.service';
import { ModalService } from '../../../services/modal.service';
import { standardConfig, notAddableConfig } from '../../../config/tables.config';
import { MultipleSelectDropdownComponent } from '../../../shared/view-cells/multiple-select-dropdown/multiple-select-dropdown.component';
import * as _ from 'lodash';
import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { ViewOnlyCheckboxComponent } from '../../../shared/view-cells/view-only-checkbox/view-only-checkbox.component';

@Component({
  selector: 'ngx-role',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss']
})
export class RolesComponent implements OnInit, OnDestroy {
  role: any = {
    name: '',
    description: '',
    actions: [],
    dependsOnManifestation: false,
    show: false
  };
  subscriptions: Subscription[] = [];
  source: DataSource = new DataSource();
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
    this.privilegesService.getRoles()
    .then(role => this.source.load(role))
    .catch(err => this.notificationsService.error('COULD_NOT_LOAD_DATA'));

    this.subscriptions.push(
    this.privilegesService.notify('createRole')
      .subscribe(role => this.source.insert(role)));

    this.subscriptions.push(
      this.privilegesService.notify('editRole')
      .subscribe(role => this.source.edit(role)));

    this.subscriptions.push(
      this.privilegesService.notify('removeRole')
      .subscribe(role => this.source.delete(role)));

    this.privilegesService.getActions()
    .then(actions => this.role.actions = actions.filter((action: any) => action.dependsOnManifestation === this.role.dependsOnManifestation));

    this.getNotifiedForActions(this.role.actions);
  }

  onCheckboxChange(event) {
    const value = event.returnValue;
    this.role.actions = [];
    this.privilegesService.getActions()
    .then(actions => {
      this.role.actions = actions.filter((action: any) => action.dependsOnManifestation === value);
    });
  }

  getNotifiedForActions(actionsArray: any[]) {
    this.subscriptions.push(
    this.privilegesService.notify('createAction')
      .subscribe(action => actionsArray.push(action)));

    this.subscriptions.push(
      this.privilegesService.notify('editAction')
      .subscribe(action => actionsArray.splice(actionsArray.findIndex(el => el.id === action.id), 1, action)));

    this.subscriptions.push(
      this.privilegesService.notify('removeAction')
      .subscribe(action => actionsArray.splice(actionsArray.findIndex(el => el.id === action.id), 1)));
  }


  onButtonClicked() {
    const role: RoleInterface = _.cloneDeep(this.role);
    role.actions = role.actions.filter((action: any) => action.selected);
    this.privilegesService.createRole(role)
      .then(_role => {
        this.notificationsService.success('ROLE_CREATED');
        this.source.insert(_role);
        this.role.show = false;
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
    alias: {
      title: 'ALIAS',
      type: 'text'
    },
    actions: {
      title: 'ACTIONS',
      type: 'custom',
      renderComponent: MultipleSelectDropdownComponent,
      onComponentInitFunction: (instance) => {

        instance.internalArrayKey = 'Actions';
        this.privilegesService.getActions()
        .then(actions => {
          actions = actions.filter((action: any) => action.dependsOnManifestation === instance.rowData.dependsOnManifestation);
          instance.parentNotifier.emit('items', actions);
        });


        this.getNotifiedForActions(instance.items);
        instance.parentNotifier.on('change', changed => {
          this.privilegesService.updateSelectedAction(instance.rowData, changed)
            .then(result => this.notificationsService.success('SELECTED_ACTION_UPDATE_SUCCEDED'))
            .catch(err => this.notificationsService.error('OPERATION_FAILED_ERROR_MESSAGE'));
        });
      },
      addable: false,
      editable: false
    },
    dependsOnManifestation: {
      title: 'DEPENDS_ON_MANIFESTATION',
      type: 'custom',
      renderComponent: ViewOnlyCheckboxComponent,
      onComponentInitFunction: (instance) => {
         /*instance.parentNotifier.on('change', changed => {
          this.privilegesService.updateRoleManifestationDependency(instance.rowData, changed)
            .then(result => this.notificationsService.success('MANIFESTATION_DEPENDENCY_UPDATE_SUCCEDED'))
            .catch(err => this.notificationsService.error('OPERATION_FAILED_ERROR_MESSAGE'));
        });*/
      },
      addable: false,
      editable: false
    }
  });


  onEditConfirm(event) {
    event.confirm.resolve();
    this.privilegesService.editRole(event.newData)
      .then(result => this.notificationsService.success('ROLE_UPDATED'))
      .catch(err => this.notificationsService.error('OPERATION_FAILED_ERROR_MESSAGE'));
  }

  onDeleteConfirm(event): void {
    this.modalService.confirm('ARE_YOU_SURE_YOU_WANT_TO_DELETE')
      .then(confirmation => {
        if (confirmation) {
          event.confirm.resolve();
          this.privilegesService.removeRole(event.data)
            .then(result => this.notificationsService.success('DELETE_SUCCEDED'))
            .catch(err => this.notificationsService.error('OPERATION_FAILED_ERROR_MESSAGE'));
        } else {
          event.confirm.reject();
        }
      });
  }

  toggleForm() {
    this.role.show = !this.role.show;
  }
  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

}

