import { TranslateService } from '@ngx-translate/core';
import { alertSettings, confirmSettings } from './../config/modal.config';
import { ConfirmModalComponent } from './../shared/modals/confirm-modal/confirm-modal.component';
import { AlertModalComponent } from './../shared/modals/alert-modal/alert-modal.component';
import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor(private modalService: NgbModal, private translateService: TranslateService) { }

  async alert(header: string, message: string) {
    const modal = this.modalService.open(AlertModalComponent, alertSettings);
    modal.componentInstance.modalHeader = await this.translateService.get(header).toPromise();
    modal.componentInstance.modalContent = await this.translateService.get(message).toPromise();
    return modal.result;
  }

  async confirm(message: string) {
    const modal = this.modalService.open(ConfirmModalComponent, confirmSettings);
    modal.componentInstance.modalHeader = await this.translateService.get('DO_YOU_CONFIRM').toPromise();
    modal.componentInstance.modalContent = await this.translateService.get(message).toPromise();
    return modal.result;
  }

  open(modalComponent, settings, afterOpen) {
    const modal = this.modalService.open(modalComponent, settings);
    afterOpen(modal.componentInstance);
    return modal.result;
  }

}
