import { Component, OnInit, Input } from '@angular/core';
import { PrivilegesService } from '../../../services/privileges.service';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'ngx-roles-list',
  templateUrl: './roles-list.component.html',
  styleUrls: ['./roles-list.component.scss']
})
export class RolesListComponent implements OnInit {
  
  @Input() title : string;

  roles:any = [];

  constructor(private privilegesService: PrivilegesService,
              protected ref: NbDialogRef<RolesListComponent>) { }

  ngOnInit() {
    this.privilegesService.getRoles()
    .then(roles => this.roles = roles);

    this.getNotifiedForRoles(this.roles);
  }

  getNotifiedForRoles(roleArray: any[]) {
    this.privilegesService.notify('createRole')
      .subscribe(role => roleArray.push(role));

    this.privilegesService.notify('editRole')
      .subscribe(role =>
        roleArray.splice(roleArray.findIndex(el => el.id === role.id), 1, role));

    this.privilegesService.notify('removeRole')
      .subscribe(role =>
        roleArray.splice(roleArray.findIndex(el => el.id === role.id), 1));
  }

  cancel(){
    this.ref.close();
  }

  submit(roles){
    roles = roles.filter((role: any) => role.selected);
    this.ref.close(roles)
  }
}
