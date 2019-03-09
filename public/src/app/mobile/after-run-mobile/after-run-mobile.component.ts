import { Component, OnInit } from '@angular/core';
import { ParamsService } from '../../services/params.service';
import { TranslateService } from '@ngx-translate/core';
import { RunService } from '../../services/run.service';
import { NotificationsService } from '../../services/notifications.service';
import { Router } from '@angular/router';
import { FieldsService } from '../../services/fields.service';

@Component({
  selector: 'ngx-afterrun',
  templateUrl: './after-run-mobile.component.html',
  styleUrls: ['./after-run-mobile.component.scss']
})
export class AfterRunMobileComponent implements OnInit {
  category: any;
  runSettings: any;
  team: any;
  events: any;
  score: any;
  run: any;

  isContestation: false;
  toEliminate: false;
  contestation: any;

  constructor(private paramsService: ParamsService,
              private translateService: TranslateService,
              private runService: RunService,
              private notificationsService: NotificationsService,
              private router: Router,
              private fieldsService: FieldsService) { }

  ngOnInit() {
    const data = this.paramsService.getParams();
    this.category = data.category;
    this.runSettings = data.runSettings;
    this.team = data.team;
    this.events = data.events;
    this.score = data.score;
    this.run = data.run;
  }

  sendRace() {
      this.runService.endRun(this.run, this.runSettings, this.toEliminate, this.isContestation, this.contestation, this.score, this.events)
      .then(() => {
        this.notificationsService.success('RACE_UPLOADED_SUCCESSFUL');
        this.router.navigate(['/mobile', 'dashboard']);
      })
      .catch(err => this.notificationsService.error('RACE_UPLOAD_ERROR'));

      this.fieldsService.endRunOnField(this.runSettings.field);
  }

}
