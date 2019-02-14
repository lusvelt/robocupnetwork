import { Component, OnInit, HostListener, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { PrivilegesService } from '../../../services/privileges.service';
import { EditRolesModalComponent } from '../edit-roles-modal/edit-roles-modal.component';
import { NbDialogConfig } from '@nebular/theme';

@Component({
  selector: 'ngx-view-only-roles-modal',
  templateUrl: './view-only-roles-modal.component.html',
  styleUrls: ['./view-only-roles-modal.component.scss']
})
export class ViewOnlyRolesModalComponent implements OnInit {
  @Input() public user: any;
  modalHeader: string;
  modalContent: string;

  basicRoles: any = [];
  manifestations: any = [];

  constructor(private activeModal: NgbActiveModal,
    private translateService: TranslateService,
    private privilegesService: PrivilegesService,
    private modalService: NgbModal) {
     }

    ngOnInit() {
      this.privilegesService.getRolesFromId(this.user.id)
      .then((roles: any) => this.basicRoles = roles);

      this.privilegesService.getManifestationsFromId(this.user.id)
      .then((manifestations: any) => {
        this.manifestations = manifestations;
      })
      .then(() => {
        this.manifestations.forEach((manifestation => {
          this.privilegesService.getRolesInManifestationFromId(this.user.id, manifestation.id)
          .then(roles => manifestation.roles = roles);
          }));
      });
    }

  closeModal(confirmation: boolean) {
    this.activeModal.close(confirmation);
  }

  openEditModal () {
    this.activeModal.close(false);
    const modal = this.modalService.open(EditRolesModalComponent);
    modal.componentInstance.user = this.user;
    modal.componentInstance.usersBasicRoles = this.basicRoles;
    modal.componentInstance.usersManifestations = this.manifestations;
  }

  @HostListener('document:keydown.enter', ['$event']) onEnter(event: KeyboardEvent) {
    this.closeModal(true);
  }

}
