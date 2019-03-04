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
import { toInteger } from '@ng-bootstrap/ng-bootstrap/util/util';
import { AuthService } from '../../../services/auth.service';
import { SingleButtonComponent } from '../../../shared/view-cells/single-button/single-button.component';

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
    maxTeamsPerLineUp: '',
    isDividedIntoZones: false,
    checkpointsDetermineZones: false,
    requiresEvacuation: false,
    defaultMaxTime: '',
  };

  show= false;

  subscriptions: Subscription[] = [];
  source: DataSource= new DataSource();

  constructor(private tablesService: TablesService,
    private translateService: TranslateService,
    private categoriesService: CategoriesService,
    private notificationsService: NotificationsService,
    private modalService: ModalService,
    private config: NgbDropdownConfig,
    private authService: AuthService) {
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
    this.category.maxRobotsPerTeam = parseInt(this.category.maxRobotsPerTeam, 10);
    this.category.maxTeamsPerLineUp = parseInt(this.category.maxTeamsPerLineUp, 10);
    this.category.defaultMaxTime = parseInt(this.category.defaultMaxTime, 10);
    const category: CategoryInterface = _.cloneDeep(this.category);
    if (category.name !== '' && category.description !== '' && category.scoringType !== '' && category.runType !== '') {
      this.categoriesService.createCategory(category)
        .then(_category => {
          this.notificationsService.success('CATEGORY_CREATED');
          this.source.insert(_category);
          this.show = false;
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
    maxTeamsPerLineUp: {
      title: 'CATEGORY_MAX_TEAMS_PER_LINEUP',
      type: 'number',
    },
    isDividedIntoZones: {
      title: 'CATEGORY_IS_DIVIDED_INTO_ZONES',
      type: 'boolean',
      addable: false,
      editable: false
    },
    checkpointsDetermineZones: {
      title: 'CATEGORY_CHECKPOINTS_DETERMINE_ZONES',
      type: 'boolean',
      addable: false,
      editable: false
    },
    requiresEvacuation: {
      title: 'CATEGORY_REQUIRES_EVACUATION',
      type: 'boolean',
      addable: false,
      editable: false
    },
    defaultMaxTime: {
      title: 'CATEGORY_DEFAULT_MAX_TIME',
      type: 'number',
    },
    settings: {
      title: 'EVENTS',
      type: 'custom',
      renderComponent: SingleButtonComponent,
      onComponentInitFunction: (instance) => {
        instance.internalKey = 'openSettingsInCategoryModal'; /*
        instance.parentNotifier.on('change', changed => {
          this.usersService.updateUserBirthdate(instance.rowData, changed)
            .then(result => this.notificationsService.success('BIRTHDATE_UPDATE_SUCCEDED'))
            .catch(err => this.notificationsService.error('OPERATION_FAILED_ERROR_MESSAGE'));
        });*/
      }
    }
  });

  onEditConfirm(event) {
    if (this.authService.canDo('editCategory')) {
      event.confirm.resolve();
      this.categoriesService.editCategory(event.newData)
        .then(result => this.notificationsService.success('CATEGORY_UPDATED'))
        .catch(err => this.notificationsService.error('OPERATION_FAILED_ERROR_MESSAGE'));
    } else {
      this.notificationsService.error('UNAUTHORIZED');
    }
  }

  onDeleteConfirm(event): void {
    if (this.authService.canDo('deleteCategory')) {
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
    } else {
      this.notificationsService.error('UNATHORIZED');
    }
  }

  toggleForm() {
    this.show = !this.show;
  }
  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
