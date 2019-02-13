import { Component, OnInit, HostListener, ViewChild } from '@angular/core';
import { NgbActiveModal, NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';
import { Observable } from 'rxjs/Observable';
import { debounceTime, filter, distinctUntilChanged, merge, map } from 'rxjs/operators';
import { ManifestationsService } from '../../../services/manifestations.service';
import * as _ from 'lodash';












@Component({
  selector: 'ngx-edit-roles-modal',
  templateUrl: './edit-roles-modal.component.html',
  styleUrls: ['./edit-roles-modal.component.scss']
})
export class EditRolesModalComponent implements OnInit {

    modalHeader: string;
    modalContent: string;

    manifestationsList: [];

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
                private manifestationsService: ManifestationsService) { }

    closeModal(confirmation: boolean) {
        this.activeModal.close(confirmation);
    }

    ngOnInit() {
      this.manifestationsService.getManifestations()
    .then(manifestations => this.manifestationsList = manifestations);
    }

    @HostListener('document:keydown.enter', ['$event']) onEnter(event: KeyboardEvent) {
        this.closeModal(true);
    }

}
