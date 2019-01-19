import { UsersService } from './../../../services/users.service';
import { TranslateService } from '@ngx-translate/core';
import { ModalService } from './../../../services/modal.service';
import { NotificationsService } from './../../../services/notifications.service';
import { PrivilegesService } from './../../../services/privileges.service';
import { TablesService } from './../../../services/tables.service';
import { Component, OnInit } from '@angular/core';
import { DataSource } from '../../../classes/data-source.class';
import { notAddableConfig } from '../../../config/tables.config';
import { SingleDateComponent } from '../../../shared/view-cells/single-date/single-date.component';

@Component({
  selector: 'ngx-manage-user',
  templateUrl: './manage-user.component.html',
  styleUrls: ['./manage-user.component.scss']
})
export class ManageUserComponent implements OnInit {

  source: DataSource = new DataSource();

  constructor(
      private tablesService: TablesService,
      private privilegesService: PrivilegesService,
      private notificationsService: NotificationsService,
      private modalService: ModalService,
      private translateService: TranslateService,
      private usersService: UsersService
  ) { }

  ngOnInit() {
    this.usersService.getUsers()
    .then(users => this.source.load(users))
    .catch(err => this.notificationsService.error('COULD_NOT_LOAD_DATA'));

    this.usersService.notify('createUser')
    .subscribe(user => this.source.insert(user));

    this.usersService.notify('editUser')
    .subscribe(user => this.source.edit(user));

    this.usersService.notify('removeUser')
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
      title: 'NAME',
      type: 'text',
    },
    surname: {
      title: 'SURNAME',
      type: 'text',
    },
    birthDate: {
      title: 'BIRTHDATE',
      type: 'custom',
      renderComponent: SingleDateComponent,
    },
    email: {
      title: 'EMAIL',
      type: 'text',
    },
    isAdmin: {
      title: 'ADMIN',
      type: 'text',
      editable: false
    }
  });

  onEditConfirm(event) {
    event.confirm.resolve()/*;
    this.privilegesService.editUser(event.newData)*/
      .then(result => this.notificationsService.success('ACTION_TYPE_UPDATED'))
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
