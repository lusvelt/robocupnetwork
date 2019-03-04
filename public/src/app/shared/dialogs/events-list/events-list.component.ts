import { Component, OnInit, Input } from '@angular/core';
import { PrivilegesService } from '../../../services/privileges.service';
import { NbDialogRef } from '@nebular/theme';
import { EventsService } from '../../../services/events.service';
import { DataSource } from '../../../classes/data-source.class';
import { TablesService } from '../../../services/tables.service';
import { standardConfig } from '../../../config/tables.config';
import { NotificationsService } from '../../../services/notifications.service';
import { ModalService } from '../../../services/modal.service';
import { Subscription } from 'rxjs';
import { MultipleSelectDropdownComponent } from '../../view-cells/multiple-select-dropdown/multiple-select-dropdown.component';

@Component({
  selector: 'ngx-events-list',
  templateUrl: './events-list.component.html',
  styleUrls: ['./events-list.component.scss']
})
export class EventsListComponent implements OnInit {

  @Input() title: string;
  @Input() events: any[];
  @Input() category: any;

  source: DataSource= new DataSource();
  subscriptions: Subscription[] = [];

  constructor(private eventsService: EventsService,
              protected ref: NbDialogRef<EventsListComponent>,
              private tablesService: TablesService,
              private notificationsService: NotificationsService,
              private modalService: ModalService) { }

  ngOnInit() {
    this.source.load(this.events);

    this.subscriptions.push(
      this.eventsService.notify('createEvent')
        .subscribe(data => {
          const event = data.event;
          const category = data._category;
          if (category.id === this.category.id)
            this.source.insert(event);
        }));

      this.subscriptions.push(
        this.eventsService.notify('editEvent')
        .subscribe(data => {
          const event = data._event;
          const category = data._category;
          if (category.id === this.category.id)
            this.source.edit(event);
        }));

      this.subscriptions.push(
        this.eventsService.notify('removeEvent')
        .subscribe(data => {
          const event = data._event;
          const category = data._category;
          if (category.id === this.category.id)
            this.source.delete(event);
        }));

  }

  getNotifiedForEvents(eventsArray: any) {
    this.subscriptions.push(
      this.eventsService.notify('createEvent')
        .subscribe(data => {
          const event = data.event;
          const category = data._category;
          if (category.id === this.category.id)
           eventsArray.push(event);
        }));

      this.subscriptions.push(
        this.eventsService.notify('editEvent')
        .subscribe(data => {
          const event = data._event;
          const category = data._category;
          if (category.id === this.category.id)
            eventsArray.splice(eventsArray.findIndex(el => el.id === event.id), 1, event);
        }));

      this.subscriptions.push(
        this.eventsService.notify('removeEvent')
        .subscribe(data => {
          const event = data._event;
          const category = data._category;
          if (category.id === this.category.id)
          eventsArray.splice(eventsArray.findIndex(el => el.id === event.id), 1);
        }));
  }

  settings = this.tablesService.getSettings(standardConfig, {
    id: {
      title: 'ID',
      type: 'number',
      addable: false,
      editable: false
    },
    name: {
      title: 'NAME',
      type: 'text',
      width: '2 px',
    },
    description: {
      title: 'DESCRIPTION',
      type: 'text',
    },
    event: {
      title: 'EVENT',
      type: 'custom',
      renderComponent: MultipleSelectDropdownComponent,
      onComponentInitFunction: (instance) => {
        instance.internalArrayKey = 'Events';
        this.eventsService.getEventsInCategory(this.category)
        .then(events => {
          instance.parentNotifier.emit('items', events);
        });

        this.getNotifiedForEvents(instance.items);

        instance.parentNotifier.on('change', changed => {
          this.eventsService.updateEventsInEvent(instance.rowData, changed)
          .then(() => this.notificationsService.success('UPDATED_EVENTS_IN_EVENT_SUCCEDDED'))
          .catch(err => this.notificationsService.error('OPERATION_FAILED_ERROR_MESSAGE'));
        });
      },
      addable: false,
      editable: false
    },
    pointsJSCalculator: {
      title: 'POINTS_JS_CALCULATOR',
      type: 'text',
    },
    affectsZone: {
      title: 'AFFECTS_ZONE',
      type: 'text',
    },
    affectsAttempt: {
      title: 'AFFECTS_ATTEMPT',
      type: 'text',
    },
    manuallyTriggerable: {
      title: 'MANUALLY_TRIGGERABLE',
      type: 'text',
    },
    needsStartCountForZones: {
      title: 'NEEDS_START_COUNT_FOR_ZONES',
      type: 'text'
    },
    triggerOnStart: {
      title: 'TRIGGER_ON_START',
      type: 'text'
    },
    waitLastIterationToTrigger: {
      title: 'WAIT_LAST_ITERATION_TO_TRIGGER',
      type: 'text'
    },
    cancelPendingEvents: {
      title: 'CANCEL_PENDING_EVENTS',
      type: 'number',
    }
  });

  onEditConfirm(event) {
      event.confirm.resolve();
      this.eventsService.editEvent(event.newData, this.category)
        .then(result => this.notificationsService.success('CATEGORY_UPDATED'))
        .catch(err => this.notificationsService.error('OPERATION_FAILED_ERROR_MESSAGE'));
  }

  onDeleteConfirm(event): void {
      this.modalService.confirm('ARE_YOU_SURE_YOU_WANT_TO_DELETE')
        .then(confirmation => {
          if (confirmation) {
            event.confirm.resolve();
            this.eventsService.removeEvent(event.data, this.category)
              .then(result => this.notificationsService.success('DELETE_SUCCEDED'))
              .catch(err => this.notificationsService.error('OPERATION_FAILED_ERROR_MESSAGE'));
          } else {
            event.confirm.reject();
          }
        });
  }

  onCreateConfirm(event) {
    event.confirm.resolve();
    this.eventsService.createEventInCategory(event.newData, this.category)
      .then(result => {
        this.source.getAll()
          .then(items => {
            items[0].id = result.id;
            this.source.refresh();
            this.notificationsService.success('EVENT_CREATED');
          });
      })
      .catch(err => this.notificationsService.error('OPERATION_FAILED_ERROR_MESSAGE'));
  }

  cancel() {
    this.ref.close();
  }

}
