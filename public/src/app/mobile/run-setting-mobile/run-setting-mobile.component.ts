import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { NotificationsService } from '../../services/notifications.service';

import 'rxjs/add/operator/catch';
import { UserService } from '../../services/user.service';
import { TeamComponent } from '../../pages/dashboard/team/team.component';
import { CategoriesService } from '../../services/categories.service';
import { RunService } from '../../services/run.service';
import { ParamsService } from '../../services/params.service';
import { ModalService } from '../../services/modal.service';
import { environment } from '../../../environments/environment';
import { FieldsService } from '../../services/fields.service';
@Component({
  selector: 'ngx-runsetting',
  templateUrl: './run-setting-mobile.component.html',
  styleUrls: ['./run-setting-mobile.component.scss']
})
export class RunSettingMobileComponent implements OnInit {

  constructor(private translate: TranslateService,
              private authService: AuthService,
              private router: Router,
              private notificationsService: NotificationsService,
              private userService: UserService,
              private route: ActivatedRoute,
              private categoriesService: CategoriesService,
              private runService: RunService,
              private paramsService: ParamsService,
              private modalService: ModalService,
              private fieldsService: FieldsService) { }


  redirectDelay: number = 0;
  strategy: string = '';
  fullName: string;

  arbitratedRuns: { name: string, points: string }[] = [
    { name: 'Fenix', points: '121 pt' },
    { name: 'Jamil', points: '20 pt' },
    { name: 'Elettroncica 1', points: '40 pt' },
    { name: 'Erminio', points: '22 pt' },
    { name: 'Dellemonudo', points: '32 pt' },
  ];
  errors: string[] = [];
  messages: string[] = [];

  category: any;
  leftTime: any= '';
  user: any = {};
  team: any = {};

  runsetting: any = {
    evacuationType: 'high',
    aliveVictims: undefined,
    deadVictims: undefined,
    lastCheckpointIsRoom: true,
    field: [ ],
    numberOfCheckpoints: undefined,
    checkpoints: [ ],
    maxTime: 480
  };

  submitted: boolean = false;
  rememberMe = false;

  fieldsList: any = [];

  ngOnInit() {
    this.fullName = this.userService.getFullName();
    const data = this.paramsService.getParams();
    this.team = JSON.parse(data.text); // data.text
    this.categoriesService.findCategoryFromPhaseId(this.team.Phases[0])
    .then(category => {
      this.runsetting.maxTime = category.defaultMaxTime;
      this.category = category;
    });

    this.fieldsService.findFieldsFromPhaseId(this.team.Phases[0])
    .then(fields => {
      this.runsetting.field = fields;
    });
  }

  onFinished() {

  }

  changeStatus(cd1) {
    this.leftTime = cd1.left;
    if (cd1.paused) {
      cd1.resume();
    } else {
      cd1.pause();
    }
  }

  visualizza() {
    this.runsetting.maxTime = this.leftTime / 1000;
    const oldField = this.runsetting.field;
    this.runsetting.field = this.runsetting.field.filter((field: any) => field.selected);
    if ( this.runsetting.field.length === 1) {
      this.modalService.confirm('ARE_YOU_SURE_YOU_WANT_TO_START')
          .then(confirmation => {
            if (confirmation) {
              this.runService.startRun(this.runsetting, this.team)
              .then(run => {
                this.paramsService.setParams({
                  run : run,
                  runSettings: this.runsetting,
                  team: this.team,
                  category: this.category
                });
                this.router.navigate(['/mobile', 'scoring-run']);
              });

              this.fieldsService.updateFieldStatus(this.runsetting.field, this.team.name);
            }
          });
    } else {
      this.runsetting.field = oldField;
      this.notificationsService.error('YOU_CAN_CHOOSE_ONLY_ONE_FIELD');
    }
  }

  onNumberOfCheckpointChange() {
    this.runsetting.checkpoints = [];
    for (let i = 0; i < this.runsetting.numberOfCheckpoints; i++)
      this.runsetting.checkpoints.push(0);
  }

  onLastCheckpointIsRoomChange() {
    if (!this.runsetting.lastCheckpointIsRoom)
      this.runsetting.checkpoints.push(0);
    else
      this.runsetting.checkpoints.splice(this.runsetting.checkpoints.length - 1, 1);
  }

  backToDashboard() {
    this.router.navigate(['/mobile', 'dashboard']);
  }

  trackByIndex(index: number, obj: any): any {
    return index;
  }

  languageSelect(language) {
    if (language === 'italian')
      this.translate.setDefaultLang('it');
    if (language === 'english')
      this.translate.setDefaultLang('en');
  }

}
