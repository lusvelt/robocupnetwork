import { Component, OnInit, Input } from '@angular/core';
import { UsersService } from '../../../services/users.service';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'ngx-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})

export class UsersListComponent implements OnInit {

  @Input() title: string;
  @Input() oldUsers: any[];

  users: any = [];

  constructor(private usersService: UsersService,
              protected ref: NbDialogRef<UsersListComponent>) { }

  ngOnInit() {
    this.usersService.getUsers()
    .then(users => {
      this.users = users.map(user => {
        const oldUser = this.oldUsers.find(el => el.id === user.id);
        user.selected = oldUser ? !!oldUser.selected : false;
        return user;
      });
    });

    this.getNotifiedForUsers(this.users);
  }

  getNotifiedForUsers(userArray: any[]) {
    this.usersService.notify('createUser')
      .subscribe(user => userArray.push(user));

    this.usersService.notify('editUser')
      .subscribe(user =>
        userArray.splice(userArray.findIndex(el => el.id === user.id), 1, user));

    this.usersService.notify('removeUser')
      .subscribe(user =>
        userArray.splice(userArray.findIndex(el => el.id === user.id), 1));
  }

  cancel() {
    this.ref.close();
  }

  submit(users) {
    users = users.filter((user: any) => user.selected);
    this.ref.close(users);
  }
}
