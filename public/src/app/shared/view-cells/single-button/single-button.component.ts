import { confirmSettings } from './../../../config/modal.config';
import { Component, OnInit, Input } from '@angular/core';
import { ModalService } from '../../../services/modal.service';
import { ViewOnlyRolesModalComponent } from '../../modals/view-only-roles-modal/view-only-roles-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'ngx-single-button',
  templateUrl: './single-button.component.html',
  styleUrls: ['./single-button.component.scss']
})
export class SingleButtonComponent implements OnInit {
  @Input() value: any;
  @Input() rowData: any;
  internalKey: string;
  constructor(private modalService: NgbModal) { }

  ngOnInit() {
  }

  onClick() {
    if (this.internalKey === 'openRolesModal') {
      const modal = this.modalService.open(ViewOnlyRolesModalComponent);
      modal.componentInstance.user = this.rowData;
    }
  }

}
