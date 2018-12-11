import { SocketIoService } from './../../services/socket-io.service';
import { Observable } from 'rxjs/Observable';
import { LocalDataSource } from 'ng2-smart-table';
import { Component, OnInit } from '@angular/core';
import { SmartTableService } from '../../@core/data/smart-table.service';

@Component({
  selector: 'ngx-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  users = [];

  settings = {
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {
      id: {
        title: 'ID',
        type: 'number',
      },
      name: {
        title: 'Name',
        type: 'string',
      },
      surname: {
        title: 'Surname',
        type: 'string',
      },
      email: {
        title: 'Email',
        type: 'string',
      },
      birthDate: {
        title: 'Birth date',
        type: 'string',
      }
    },
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(private service: SmartTableService, private socketIoService: SocketIoService) { }

  ngOnInit() {
    const data = this.service.getData();
    this.source.load(data);

    this.socketIoService.on('newUser')
      .subscribe(user => this.users.push(user));

    this.socketIoService.on('deleteUser')
      .subscribe(user => this.users.splice(this.users.indexOf(user), 1));

    this.socketIoService.on('editUser')
      .subscribe((args: any) => this.users.splice(this.users.indexOf(args.old), 1, args.new));
  }

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }

}
