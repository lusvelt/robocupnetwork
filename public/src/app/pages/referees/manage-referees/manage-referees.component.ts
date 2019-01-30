import { filter } from 'rxjs/operators';
import { TablesService } from './../../../services/tables.service';
import { NotificationsService } from './../../../services/notifications.service';
import { UsersService } from './../../../services/users.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ModalService } from '../../../services/modal.service';
import { DataSource } from '../../../classes/data-source.class';
import { standardConfig } from '../../../config/tables.config';
import { UserInterface } from '../../../interfaces/user.interface';
import * as _ from 'lodash';
import { Subscription } from 'rxjs/Subscription';
@Component({
  selector: 'ngx-manage-referees',
  templateUrl: './manage-referees.component.html',
  styleUrls: ['./manage-referees.component.scss']
})
export class ManageRefereesComponent implements OnInit, OnDestroy {
  referee: any = {
    name: '',
    show: false
  };

  subscriptions: Subscription[] = [];
  source: DataSource = new DataSource();

  refereesId: number;

  constructor(private usersService: UsersService,
    private notificationsService: NotificationsService,
    private translateService: TranslateService,
    private modalService: ModalService,
    private tablesService: TablesService) { }

  ngOnInit() {
    // this.usersService.getUsersHasRoleInManifestation()
    //   .then(users =>
    //     users.forEach(user => {
    //       if (user.roleId === 1) {
    //         //  console.log(user.userId, user.manifestationId);
    //       }
    //     })
    //   );
  }

  onConfirm() {
    // this.usersService.getUsersHasRoleInManifestation()
    //   .then(users =>
    //     users.forEach(user => {
    //       // console.log(user.roleId , this.refereesId);
    //       if (user.roleId === this.refereesId) {
    //         //  console.log(user.userId, user.manifestationId);
    //       }
    //     })
    //   );
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
      type: 'text'
    }
  });

  toggleForm() {
    this.referee.show = !this.referee.show;
  }
  ngOnDestroy() {
    // this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
