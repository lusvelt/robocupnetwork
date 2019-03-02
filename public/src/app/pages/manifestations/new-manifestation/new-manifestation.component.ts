import { ManifestationInterface } from './../../../interfaces/manifestation.interface';
import { DataSource } from './../../../classes/data-source.class';
import { ManifestationsService } from './../../../services/manifestations.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { TablesService } from '../../../services/tables.service';
import { TranslateService } from '@ngx-translate/core';
import { NotificationsService } from '../../../services/notifications.service';
import { ModalService } from '../../../services/modal.service';
import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';
import * as _ from 'lodash';
import { notAddableConfig } from '../../../config/tables.config';
import { DatePipe } from '@angular/common';
import { Subscription } from 'rxjs/Subscription';
import { SingleDateComponent } from '../../../shared/view-cells/single-date/single-date.component';

@Component({
  selector: 'ngx-new-manifestation',
  templateUrl: './new-manifestation.component.html',
  styleUrls: ['./new-manifestation.component.scss']
})
export class NewManifestationComponent implements OnInit, OnDestroy {
  manifestation: any = {
    name: '',
    description: '',
    show: false
  };
  subscriptions: Subscription[] = [];
  source: DataSource = new DataSource();
  constructor(private tablesService: TablesService,
              private translateService: TranslateService,
              private notificationsService: NotificationsService,
              private modalService: ModalService,
              private manifestationsService: ManifestationsService,
              private config: NgbDropdownConfig,
              private datePipe: DatePipe) {
                config.autoClose = false;
               }

  ngOnInit() {
    this.manifestationsService.getManifestations()
      .then(manifestation => this.source.load(manifestation))
      .catch(err => this.notificationsService.error('COULD_NOT_LOAD_DATA'));

    this.subscriptions.push(
      this.manifestationsService.notify('createManifestation')
      .subscribe(manifestation => this.source.insert(manifestation)));

    this.subscriptions.push(
      this.manifestationsService.notify('editManifestation')
      .subscribe(manifestation => this.source.edit(manifestation)));

    this.subscriptions.push(
      this.manifestationsService.notify('removeManifestation')
      .subscribe(manifestation => this.source.delete(manifestation)));
  }

  onButtonClicked() {
    const manifestation: ManifestationInterface = _.cloneDeep(this.manifestation);

    manifestation.start = new Date(this.manifestation.start);
    manifestation.end = new Date(this.manifestation.end);
    if (manifestation.name !== '' && manifestation.description !== '') {
    this.manifestationsService.createManifestation(manifestation)
      .then(_manifestation => {
        this.notificationsService.success('MANIFESTATION_CREATED');
        this.source.insert(_manifestation);
        this.manifestation.show = false;
      });
    } else {
      this.notificationsService.error('YOU_SHOULD_INSERT_DATA');
    }
  }

  settings = this.tablesService.getSettings(notAddableConfig, {
    id: {
      title: 'ID',
      type: 'number',
      addable: false,
      editable: false
    },
    name: {
      title: 'NAME',
      type: 'text',
    },
    description: {
      title: 'DESCRIPTION',
      type: 'text',
    },
    start: {
      title: 'START',
      type: 'custom',
      editable: false,
      renderComponent: SingleDateComponent,
      onComponentInitFunction: (instance) => {
        instance.internalKey = 'start';
        instance.parentNotifier.on('change', changed => {
          this.manifestationsService.updateStart(instance.rowData, changed)
          .then(result => this.notificationsService.success('START_UPDATE_SUCCEDED'))
          .catch(err => this.notificationsService.error('OPERATION_FAILED_ERROR_MESSAGE'));
        });
      }
    },
    end: {
      title: 'END',
      type: 'custom',
      editable: false,
      renderComponent: SingleDateComponent,
      onComponentInitFunction: (instance) => {
        instance.internalKey = 'end';
        instance.parentNotifier.on('change', changed => {
          this.manifestationsService.updateEnd(instance.rowData, changed)
          .then(result => this.notificationsService.success('END_UPDATE_SUCCEDED'))
          .catch(err => this.notificationsService.error('OPERATION_FAILED_ERROR_MESSAGE'));
        });
      }
    }
  });

  onEditConfirm(event) {
    event.confirm.resolve();
    this.manifestationsService.editManifestation(event.newData)
      .then(result => this.notificationsService.success('MANIFESTATION_UPDATED'))
      .catch(err => this.notificationsService.error('OPERATION_FAILED_ERROR_MESSAGE'));
  }

  onDeleteConfirm(event): void {
    this.modalService.confirm('ARE_YOU_SURE_YOU_WANT_TO_DELETE')
      .then(confirmation => {
        if (confirmation) {
          event.confirm.resolve();
          this.manifestationsService.removeManifestation(event.data)
            .then(result => this.notificationsService.success('DELETE_SUCCEDED'))
            .catch(err => this.notificationsService.error('OPERATION_FAILED_ERROR_MESSAGE'));
        } else {
          event.confirm.reject();
        }
      });
  }

  toggleForm() {
    this.manifestation.show = !this.manifestation.show;
  }
  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

}
