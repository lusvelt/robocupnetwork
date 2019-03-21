import { PrivilegesService } from './../../../services/privileges.service';
import { TranslateService } from '@ngx-translate/core';
import { ModalService } from './../../../services/modal.service';
import { TablesService } from './../../../services/tables.service';
import { DataSource } from './../../../classes/data-source.class';
import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy} from '@angular/core';
import { NotificationsService } from '../../../services/notifications.service';
import { standardConfig } from '../../../config/tables.config';
import { AuthService } from './../../../services/auth.service';

@Component({
  selector: 'ngx-modules',
  templateUrl: './modules.component.html',
  styleUrls: ['./modules.component.scss']
})
export class ModulesComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];
  source: DataSource = new DataSource();

  constructor(private tablesService: TablesService,
              private notificationsService: NotificationsService,
              private modalService: ModalService,
              public authService: AuthService,
              private translateService: TranslateService,
              private privilegesService: PrivilegesService) {}

  ngOnInit() {
    if (this.authService.canDo('getModules')) {
    this.privilegesService.getModules()
    .then(modals => this.source.load(modals))
    .catch(err => this.notificationsService.error('COULD_NOT_LOAD_DATA'));
  }else {
    this.notificationsService.error('UNAUTHORIZED');
  }

    this.subscriptions.push(
      this.privilegesService.notify('createModule')
      .subscribe(mod => this.source.insert(mod)));
    this.subscriptions.push(
      this.privilegesService.notify('editModule')
      .subscribe(mod => this.source.edit(mod)));
    this.subscriptions.push(
      this.privilegesService.notify('removeModule')
      .subscribe(mod => this.source.delete(mod)));
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
    if (this.authService.canDo('createModule')) {
    event.confirm.resolve();
    this.privilegesService.createModule(event.newData)
      .then(result => {
        this.source.getAll()
          .then(items => {
            items[0].id = result.id;
            this.source.refresh();
            this.notificationsService.success('MODULE_CREATED');
          });
      })
      .catch(err => this.notificationsService.error('OPERATION_FAILED_ERROR_MESSAGE'));
    }else {
      this.notificationsService.error('UNAUTHORIZED');
    }
  }

  onEditConfirm(event) {
    if (this.authService.canDo('editModule')) {
    event.confirm.resolve();
    this.privilegesService.editModule(event.newData)
      .then(result => this.notificationsService.success('MODULE_UPDATED'))
      .catch(err => this.notificationsService.error('OPERATION_FAILED_ERROR_MESSAGE'));
    }else {
      this.notificationsService.error('UNAUTHORIZED');
    }
  }

  onDeleteConfirm(event): void {
    if (this.authService.canDo('removeModule')) {
    this.modalService.confirm('ARE_YOU_SURE_YOU_WANT_TO_DELETE')
      .then(confirmation => {
        if (confirmation) {
          event.confirm.resolve();
          this.privilegesService.removeModule(event.data)
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

  ngOnDestroy() {}
}
