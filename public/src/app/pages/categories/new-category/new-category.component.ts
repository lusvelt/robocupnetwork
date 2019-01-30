import { Component, OnInit, OnDestroy } from '@angular/core';
import { notAddableConfig } from '../../../config/tables.config';
import { TablesService } from '../../../services/tables.service';
import { TranslateService } from '@ngx-translate/core';
import { NotificationsService } from '../../../services/notifications.service';
import { ModalService } from '../../../services/modal.service';
import { DataSource } from '../../../classes/data-source.class';
import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';
import { CategoriesService } from '../../../services/categories.service';
import { CategoryInterface } from '../../../interfaces/category.interface';
import * as _ from 'lodash';
import { Subscription } from 'rxjs';

@Component({
  selector: 'ngx-new-category',
  templateUrl: './new-category.component.html',
  styleUrls: ['./new-category.component.scss']
})
export class NewCategoryComponent implements OnInit, OnDestroy {

  category: any = {
    name: '',
    description: '',
    scoringType: '',
    runType: '',
    maxRobotsPerTeam: '',
    maxTeamsPerLineup: '',
    isDividedIntoZones: '',
    checkpointsDetermineZones: '',
    requiresEvacuation: '',
    defaultMaxTime: '',
    show: false
  };

  subscriptions: Subscription[] = [];
  source: DataSource= new DataSource();

  constructor(private tablesService: TablesService,
    private translateService: TranslateService,
    private categoriesService: CategoriesService,
    private notificationsService: NotificationsService,
    private modalService: ModalService,
    private config: NgbDropdownConfig) {
      config.autoClose = false;
}

  ngOnInit() {
    this.categoriesService.getCategories()
    .then(categories => this.source.load(categories))
    .catch(err => this.notificationsService.error('COULD_NOT_LOAD_DATA'));

    this.subscriptions.push(
    this.categoriesService.notify('createCategory')
      .subscribe(category => this.source.insert(category)));

    this.subscriptions.push(
      this.categoriesService.notify('editCategory')
      .subscribe(category => this.source.edit(category)));

    this.subscriptions.push(
      this.categoriesService.notify('removeCategory')
      .subscribe(category => this.source.delete(category)));
  }

  onButtonClicked() {
    const category: CategoryInterface = _.cloneDeep(this.category);
    this.categoriesService.createCategory(category)
      .then(_category => {
        this.notificationsService.success('CATEGORY_CREATED');
        this.source.insert(_category);
        this.category.show = false;
      });
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
    scoringType: {
      title: 'CATEGORY_SCORING_TYPE',
      type: 'text',
    },
    runType: {
      title: 'CATEGORY_RUN_TYPE',
      type: 'text',
    },
    maxRobotsPerTeam: {
      title: 'CATEGORY_MAX_ROBOTS_PER_TEAM',
      type: 'number',
    },
    maxTeamsPerLineup: {
      title: 'CATEGORY_MAX_TEAMS_PER_LINEUP',
      type: 'number',
    },
    isDividedIntoZones: {
      title: 'CATEGORY_IS_DIVIDED_INTO_ZONES',
      type: 'boolean',
    },
    checkpointsDetermineZones: {
      title: 'CATEGORY_CHECKPOINTS_DETERMINE_ZONES',
      type: 'boolean',
    },
    requiresEvacuation: {
      title: 'CATEGORY_REQUIRES_EVACUATION',
      type: 'boolean',
    },
    defaultMaxTime: {
      title: 'CATEGORY_DEFAULT_MAX_TIME',
      type: 'number',
    }
  });

  onEditConfirm(event) {
    event.confirm.resolve();
    this.categoriesService.editCategory(event.newData)
      .then(result => this.notificationsService.success('CATEGORY_UPDATED'))
      .catch(err => this.notificationsService.error('OPERATION_FAILED_ERROR_MESSAGE'));
  }

  onDeleteConfirm(event): void {
    this.modalService.confirm('ARE_YOU_SURE_YOU_WANT_TO_DELETE')
      .then(confirmation => {
        if (confirmation) {
          event.confirm.resolve();
          this.categoriesService.removeCategory(event.data)
            .then(result => this.notificationsService.success('DELETE_SUCCEDED'))
            .catch(err => this.notificationsService.error('OPERATION_FAILED_ERROR_MESSAGE'));
        } else {
          event.confirm.reject();
        }
      });
  }

  toggleForm() {
    this.category.show = !this.category.show;
  }
  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
