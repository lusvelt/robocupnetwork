import { Component, HostListener } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'confirm-modal',
    templateUrl: './confirm-modal.component.html'
})
export class ConfirmModalComponent {
    modalHeader: string;
    modalContent: string;

    constructor(private activeModal: NgbActiveModal) { }

    closeModal(confirmation: boolean) {
        this.activeModal.close(confirmation);
    }

    @HostListener('document:keydown.enter', ['$event']) onEnter(event: KeyboardEvent) {
        this.closeModal(true);
    }
}
