import { Component, OnInit } from '@angular/core';
import { DataSource } from '../../../classes/data-source.class';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'ngx-manage-staff',
  templateUrl: './manage-staff.component.html',
  styleUrls: ['./manage-staff.component.scss']
})
export class ManageStaffComponent implements OnInit {

  source: DataSource = new DataSource();

  constructor( public authService: AuthService) { }

  ngOnInit() {
    /* if (this.authService.isManifestationSelected() && this.authService.canDo('seeStaffInManifestation') ) {
      this.staffService.getStaffInManifestation();
    } */
  }


}
