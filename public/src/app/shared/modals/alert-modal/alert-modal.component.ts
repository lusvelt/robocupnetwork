import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Component } from '@angular/core';

@Component({
    selector: 'alert-modal',
    templateUrl: './alert-modal.component.html'
})
export class AlertModalComponent {
    modalHeader: string;
    modalContent: string;

    constructor(private activeModal: NgbActiveModal) { }

    closeModal() {
        this.activeModal.close();
    }
}
