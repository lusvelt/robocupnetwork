import { Component, OnInit } from '@angular/core';
import { ModalService } from '../../../services/modal.service';
import { EditRunModalComponent } from '../../../shared/modals/edit-run-modal/edit-run-modal.component';
import { confirmSettings } from '../../../config/modal.config';

@Component({
  selector: 'ngx-manage-run',
  templateUrl: './manage-run.component.html',
  styleUrls: ['./manage-run.component.scss']
})
export class ManageRunComponent implements OnInit {

  constructor(private modalService: ModalService) { }

  ngOnInit() {
  }

  confirmRun() {
  }

  deleteRun() {
  }

  openRunModal() {
    this.modalService.open(EditRunModalComponent, confirmSettings, () => {});
  }

}
