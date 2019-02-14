import { NbDialogService, NbDialogConfig } from '@nebular/theme';
import { SocketIoService } from './../../../services/socket-io.service';
import { PrivilegesService } from './../../../services/privileges.service';
import { Component, OnInit, HostListener, ViewChild } from '@angular/core';
import { NgbActiveModal, NgbTypeahead, NgbDropdownConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';
import { Observable } from 'rxjs/Observable';
import { debounceTime, filter, distinctUntilChanged, map } from 'rxjs/operators';
import { merge } from 'rxjs/observable/merge';
import { ManifestationsService } from '../../../services/manifestations.service';
import * as _ from 'lodash';
import { NotificationsService } from '../../../services/notifications.service';
import { RolesListComponent } from '../../dialogs/roles-list/roles-list.component';












@Component({
  selector: 'ngx-edit-roles-modal',
  templateUrl: './edit-roles-modal.component.html',
  styleUrls: ['./edit-roles-modal.component.scss']
})
export class EditRolesModalComponent implements OnInit {
    showDropdown: boolean = false;
    modalHeader: string;
    modalContent: string;

    user: any = [];
    usersBasicRoles: any = [];
    usersManifestations: any = [];
    oldItems: any[]= [];
    manifestationsList: [];
    standardRoles: any = [];

    @ViewChild('searchManifestationInstance') searchManifestationInstance: NgbTypeahead;
  focus$ = new Subject<string>();
  click$ = new Subject<string>();

  manifestationsFormatter = (value: any) => value.name;

  searchManifestation = (text$: Observable<string>) => {
    const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
    const clicksWithClosedPopup$ = this.click$.pipe(filter(() => !this.searchManifestationInstance.isPopupOpen()));
    const inputFocus$ = this.focus$;

     return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
      map(term => (term === '' ? this.manifestationsList
        : this.manifestationsList.filter((v: any) => v.name.toLowerCase().indexOf(term.toLowerCase()) > -1)).slice(0, 10))
    );
  }

    constructor(private activeModal: NgbActiveModal,
                private translateService: TranslateService,
                private manifestationsService: ManifestationsService,
                private privilegesService: PrivilegesService,
                private config: NgbDropdownConfig,
                private socketIoService: SocketIoService,
                private notificationsService: NotificationsService,
                private dialogService: NbDialogService) {
                  config.autoClose = false;
                }

    closeModal(confirmation: boolean) {
        this.activeModal.close(confirmation);
    }

    ngOnInit() {
      this.manifestationsService.getManifestations()
    .then(manifestations => this.manifestationsList = manifestations);

    this.privilegesService.getBasicRoles()
    .then(roles => {
      this.oldItems = roles;
      this.standardRoles = roles;
      this.standardRoles.forEach(item => item.selected = this.usersBasicRoles.filter(el => el.id === item.id).length > 0);
    });

    }

    @HostListener('document:keydown.enter', ['$event']) onEnter(event: KeyboardEvent) {
        this.closeModal(true);
    }

    toggleDropdown() {
    this.showDropdown = !this.showDropdown;
    if (!this.showDropdown) {
      const changed = [];
      for (let i = 0; i < this.standardRoles.length; i++) {
        if (this.standardRoles[i].selected !== this.oldItems[i].selected)
          changed.push(this.standardRoles[i]);
      }
      if (changed.length > 0)
        this.notifyParent(changed);
    } else this.oldItems = _.cloneDeep(this.standardRoles);
  }

  notifyParent(changed) {
    this.privilegesService.updateUsersBasicRoles(this.user, changed)
    .then(result => this.notificationsService.success('USERS_BASIC_ROLES_UPDATE_SUCCEDED'))
    .catch(err => this.notificationsService.error('OPERATION_FAILED_ERROR_MESSAGE'));
  }

  onCheckboxChange(event: any) {
    const value = event.returnValue;
    this.privilegesService.updateIsAdmin( this.user, value)
    .then(result => this.notificationsService.success('USERS_IS_ADMIN_UPDATE_SUCCEDED'))
    .catch(err => this.notificationsService.error('OPERATION_FAILED_ERROR_MESSAGE'));
  }

  onManifestationClicked(event: any) {
    this.activeModal.close(false);
    event.preventDefault();
    const manifestation = event.item;
    const userManifestation = this.usersManifestations.find(m => m.id === manifestation.id);
    this.dialogService.open(RolesListComponent, {
      context: {
        title: manifestation.name,
        oldRoles: userManifestation ? userManifestation.roles : []
      },
      autoFocus: true,
    }).onClose.subscribe(roles => {
      const index = this.usersManifestations.findIndex(el => el.id === manifestation.id);
      if (index !== -1)
        this.usersManifestations.splice(index, 1);
      if (roles) {
        if (roles.length !== 0) {
          manifestation.roles = roles;
          // this.usersManifestations.push(manifestation);
          this.privilegesService.updateUserHasRolesInManifestation(this.user, manifestation)
          .then(() => this.notificationsService.success('ADDED_ROLES_IN_MANIFESTATION'))
          .catch(err => this.notificationsService.error('OPERATION_FAILED_ERROR_MESSAGE'));
        } else {
          manifestation.roles = [];
          // this.usersManifestations.push(manifestation);
          this.privilegesService.updateUserHasRolesInManifestation(this.user, manifestation)
          .then(() => this.notificationsService.success('REMOVED_ROLES_IN_MANIFESTATION'))
          .catch(err => this.notificationsService.error('OPERATION_FAILED_ERROR_MESSAGE'));
        }
      }
    });
  }
}


