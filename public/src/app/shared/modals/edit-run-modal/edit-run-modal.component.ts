import { Component, OnInit, HostListener } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'ngx-edit-run-modal',
  templateUrl: './edit-run-modal.component.html',
  styleUrls: ['./edit-run-modal.component.scss']
})
export class EditRunModalComponent {

  modalHeader: string;
  modalContent: string;

  constructor(private activeModal: NgbActiveModal,
    private translateService: TranslateService) { }

  closeModal(confirmation: boolean) {
    this.activeModal.close(confirmation);
  }

  @HostListener('document:keydown.enter', ['$event']) onEnter(event: KeyboardEvent) {
    this.closeModal(true);
  }

}


