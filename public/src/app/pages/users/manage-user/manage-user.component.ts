import { Subscription } from 'rxjs/Subscription';
import { UsersService } from './../../../services/users.service';
import { TranslateService } from '@ngx-translate/core';
import { ModalService } from './../../../services/modal.service';
import { NotificationsService } from './../../../services/notifications.service';
import { PrivilegesService } from './../../../services/privileges.service';
import { TablesService } from './../../../services/tables.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataSource } from '../../../classes/data-source.class';
import { notAddableConfig } from '../../../config/tables.config';
import { SingleDateComponent } from '../../../shared/view-cells/single-date/single-date.component';

@Component({
  selector: 'ngx-manage-user',
  templateUrl: './manage-user.component.html',
  styleUrls: ['./manage-user.component.scss']
})
export class ManageUserComponent implements OnInit, OnDestroy {

  source: DataSource = new DataSource();
  subscriptions: Subscription[] = [];

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

    this.subscriptions.push(
      this.usersService.notify('createUser')
        .subscribe(user => this.source.insert(user)));

    this.subscriptions.push(
      this.usersService.notify('editUser')
        .subscribe(user => this.source.edit(user)));

    this.subscriptions.push(
      this.usersService.notify('removeUser')
        .subscribe(user => this.source.delete(user)));
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
      editable: false,
      renderComponent: SingleDateComponent,
      onComponentInitFunction: (instance) => {
        instance.internalKey = 'birthDate';
        instance.parentNotifier.on('change', changed => {
          this.usersService.updateUserBirthdate(instance.rowData, changed)
            .then(result => this.notificationsService.success('BIRTHDATE_UPDATE_SUCCEDED'))
            .catch(err => this.notificationsService.error('OPERATION_FAILED_ERROR_MESSAGE'));
        });
      }
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
    event.confirm.resolve();
    this.usersService.editUser(event.newData)
      .then(result => this.notificationsService.success('USER_UPDATED'))
      .catch(err => this.notificationsService.error('OPERATION_FAILED_ERROR_MESSAGE'));
  }

  onDeleteConfirm(event): void {
    this.modalService.confirm('ARE_YOU_SURE_YOU_WANT_TO_DELETE')
      .then(confirmation => {
        if (confirmation) {
          event.confirm.resolve();
          this.usersService.removeUser(event.data)
            .then(result => this.notificationsService.success('DELETE_SUCCEDED'))
            .catch(err => this.notificationsService.error('OPERATION_FAILED_ERROR_MESSAGE'));
        } else {
          event.confirm.reject();
        }
      });
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
