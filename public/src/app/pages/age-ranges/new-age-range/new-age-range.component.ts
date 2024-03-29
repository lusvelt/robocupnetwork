import { Component, OnInit, OnDestroy } from '@angular/core';
import { notAddableConfig } from '../../../config/tables.config';
import { TablesService } from '../../../services/tables.service';
import { TranslateService } from '@ngx-translate/core';
import { NotificationsService } from '../../../services/notifications.service';
import { ModalService } from '../../../services/modal.service';
import { DataSource } from '../../../classes/data-source.class';
import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';
import { AgeRangesService } from '../../../services/age-ranges.service';
import { AgeRangeInterface } from '../../../interfaces/age-range.interface';
import * as _ from 'lodash';
import { Subscription } from 'rxjs';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'ngx-new-age-range',
  templateUrl: './new-age-range.component.html',
  styleUrls: ['./new-age-range.component.scss']
})
export class NewAgeRangeComponent implements OnInit, OnDestroy {

  ageRange: any = {
    name: '',
    min: '',
    max: '',
    show: false
  };

  subscriptions: Subscription[] = [];
  source: DataSource= new DataSource();

  constructor(private tablesService: TablesService,
    private translateService: TranslateService,
    private ageRangesService: AgeRangesService,
    private notificationsService: NotificationsService,
    private modalService: ModalService,
    private config: NgbDropdownConfig,
    public authService: AuthService) {
      config.autoClose = false;
  }
  ngOnInit() {
    if (this.authService.canDo('getAgeRanges')) {
      this.ageRangesService.getAgeRanges()
      .then(ageRanges => this.source.load(ageRanges))
      .catch(err => this.notificationsService.error('COULD_NOT_LOAD_DATA'));
    } else {
      this.notificationsService.error('UNAUTHORIZED');
    }

    this.subscriptions.push(
    this.ageRangesService.notify('createAgeRange')
      .subscribe(ageRange => this.source.insert(ageRange)));

    this.subscriptions.push(
      this.ageRangesService.notify('editAgeRange')
      .subscribe(ageRange => this.source.edit(ageRange)));

    this.subscriptions.push(
      this.ageRangesService.notify('removeAgeRange')
      .subscribe(ageRange => this.source.delete(ageRange)));
  }

  onButtonClicked() {
    if (this.authService.canDo('getAgeRanges')) {
    const ageRange: AgeRangeInterface = _.cloneDeep(this.ageRange);
    if (ageRange.name !== '' && ageRange.min !== '' && ageRange.max !== '' ) {
      this.ageRangesService.createAgeRange(ageRange)
        .then(_ageRange => {
          this.notificationsService.success('AGE_RANGE_CREATED');
          this.source.insert(_ageRange);
          this.ageRange.show = false;
        });
    } else {
      this.notificationsService.error('YOU_SHOULD_INSERT_DATA');
    }
  } else {
    this.notificationsService.error('UNAUTHORIZED');
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
    min: {
      title: 'MIN',
      type: 'number',
    },
    max: {
      title: 'MAX',
      type: 'number',
    }
  });

  onEditConfirm(event) {
    event.confirm.resolve();
    if (this.authService.canDo('editAgeRange')) {
      this.ageRangesService.editAgeRange(event.newData)
        .then(result => this.notificationsService.success('AGE_RANGE_UPDATED'))
        .catch(err => this.notificationsService.error('OPERATION_FAILED_ERROR_MESSAGE'));
    } else {
      this.notificationsService.error('UNAUTHORIZED');
    }
  }

  onDeleteConfirm(event): void {
    if (this.authService.canDo('removeAgeRange')) {
      this.modalService.confirm('ARE_YOU_SURE_YOU_WANT_TO_DELETE')
        .then(confirmation => {
          if (confirmation) {
            event.confirm.resolve();
            this.ageRangesService.removeAgeRange(event.data)
              .then(result => this.notificationsService.success('DELETE_SUCCEDED'))
              .catch(err => this.notificationsService.error('OPERATION_FAILED_ERROR_MESSAGE'));
          } else {
            event.confirm.reject();
          }
        });
      } else {
        this.notificationsService.error('UNAUTHORIZED');
      }
  }

  toggleForm() {
    this.ageRange.show = !this.ageRange.show;
  }
  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

}
