import { Component, OnInit, HostListener, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'ngx-view-only-roles-modal',
  templateUrl: './view-only-roles-modal.component.html',
  styleUrls: ['./view-only-roles-modal.component.scss']
})
export class ViewOnlyRolesModalComponent implements OnInit {
  @Input() public user: any;
  modalHeader: string;
  modalContent: string;

  basicRoles: any = {};
  manifestations: any = {};

  ngOnInit() {
    // console.log(this.user);
  }
  constructor(private activeModal: NgbActiveModal,
    private translateService: TranslateService) { }

  closeModal(confirmation: boolean) {
    this.activeModal.close(confirmation);
  }

  @HostListener('document:keydown.enter', ['$event']) onEnter(event: KeyboardEvent) {
    this.closeModal(true);
  }

}
