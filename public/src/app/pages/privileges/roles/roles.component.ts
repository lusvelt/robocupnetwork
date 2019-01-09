import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { SmartTableService } from '../../../@core/data/smart-table.service';
import { RoleInterface } from '../../../interfaces/role.interface';
import { TranslateService } from '@ngx-translate/core';
import { DataSource } from '../../../classes/data-source.class';
import { TablesService } from '../../../services/tables.service';
import { PrivilegesService } from '../../../services/privileges.service';
import { NotificationsService } from '../../../services/notifications.service';
import { ModalService } from '../../../services/modal.service';
import { standardConfig } from '../../../config/tables.config';
import { MultipleSelectDropdownComponent } from '../../../shared/view-cells/multiple-select-dropdown/multiple-select-dropdown.component';

@Component({
  selector: 'ngx-role',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss']
})
export class RolesComponent implements OnInit {
  showForm: boolean = false;
  source: DataSource = new DataSource();
  role: any = {};
  actionChoose: any = {};

  constructor(private tablesService: TablesService,
              private translateService: TranslateService,
              private privilegesService: PrivilegesService,
              private notificationsService: NotificationsService,
              private modalService: ModalService) {
  }

  ngOnInit() {
    this.privilegesService.getRoles()
    .then(role => this.source.load(role))
    .catch(err => this.notificationsService.error('COULD_NOT_LOAD_DATA'));

    this.privilegesService.notify('createRole')
      .subscribe(role => this.source.insert(role));

    this.privilegesService.notify('editRole')
      .subscribe(role => this.source.edit(role));

    this.privilegesService.notify('removeRole')
      .subscribe(role => this.source.delete(role));
  }


  onButtonClicked() {
    const role: RoleInterface = this.role;
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
    actions: {
      title: 'ACTIONS',
      type: 'custom',
      renderComponent: MultipleSelectDropdownComponent,
      onComponentInitFunction: (instance) => {
        this.privilegesService.getActions()
          .then(actions => instance.items = actions);

        this.privilegesService.notify('createAction')
          .subscribe(action => instance.items.push(action));

        this.privilegesService.notify('editAction')
          .subscribe(action => instance.items.splice(instance.items.findIndex(el => el.id === action.id), 1, action));

        this.privilegesService.notify('removeAction')
          .subscribe(action => instance.items.splice(instance.items.findIndex(el => el.id === action.id), 1));

        instance.parentNotifier.on('change', changed => {
          this.privilegesService.updateSelectedAction(instance.rowData, changed)
            .then(result => this.notificationsService.success('SELECTED_ACTION_UPDATE_SUCCEDED'))
            .catch(err => this.notificationsService.error('OPERATION_FAILED_ERROR_MESSAGE'));
        });
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
    this.showForm = !this.showForm;
  }

}

