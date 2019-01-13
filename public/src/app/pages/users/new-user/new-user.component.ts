import { Component, OnInit } from '@angular/core';
import { PrivilegesService } from '../../../services/privileges.service';
import { NotificationsService } from '../../../services/notifications.service';
import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'ngx-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.scss']
})
export class NewUserComponent implements OnInit {
  user: any = {
    name: '',
    surname: '',
    birthdate: '',
    email: '',
    password: '',
    isAdmin: false,
    roles: []
  };


  constructor(private privilegesService: PrivilegesService,
              private notificationsService: NotificationsService,
              private config: NgbDropdownConfig) {
                config.autoClose = false;
               }

  ngOnInit() {

  }

  onButtonClicked() {}
}
