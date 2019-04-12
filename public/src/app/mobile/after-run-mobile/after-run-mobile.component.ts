import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ParamsService } from '../../services/params.service';
import { TranslateService } from '@ngx-translate/core';
import { RunService } from '../../services/run.service';
import { NotificationsService } from '../../services/notifications.service';
import { Router } from '@angular/router';
import { FieldsService } from '../../services/fields.service';
import { SignaturePad } from 'angular2-signaturepad/signature-pad';

@Component({
  selector: 'ngx-afterrun',
  templateUrl: './after-run-mobile.component.html',
  styleUrls: ['./after-run-mobile.component.scss']
})
export class AfterRunMobileComponent implements OnInit, AfterViewInit {
  category: any;
  runSettings: any;
  team: any;
  events: any;
  score: any;
  run: any;
  remainingTime: any;
  sign: any;

  isContestation: false;
  toEliminate: false;
  contestation: any;

  @ViewChild(SignaturePad) signaturePad: SignaturePad;

  public signaturePadOptions: Object = {
    // passed through to szimek/signature_pad constructor
    minWidth: 0.5,
    maxWidth: 2,
    dotSize: 1,
    canvasWidth: 600,
    canvasHeight: 200,
    backgroundColor: 'rgb(255, 255, 255)',
    penColor: 'rgb(0, 0, 0)'
  };

  ngAfterViewInit() {
    // this.signaturePad is now available
    // this.signaturePad.set('minWidth', 5); // set szimek/signature_pad options at runtime
    this.signaturePad.clear(); // invoke functions from szimek/signature_pad API
  }

  drawComplete() {
    // will be notified of szimek/signature_pad's onEnd event
    this.sign = this.signaturePad.toDataURL();
  }

  constructor(
    private paramsService: ParamsService,
    private translateService: TranslateService,
    private runService: RunService,
    private notificationsService: NotificationsService,
    private router: Router,
    private fieldsService: FieldsService
  ) {}

  ngOnInit() {
    const data = this.paramsService.getParams();
    this.category = data.category;
    this.runSettings = data.runSettings;
    this.team = data.team;
    this.events = data.events;
    this.score = data.score;
    this.run = data.run;
    this.remainingTime = data.remainingTime.left / 1000;
  }

  sendRace() {
    this.runService
      .endRun(
        this.run,
        this.runSettings,
        this.toEliminate,
        this.isContestation,
        this.contestation,
        this.score,
        this.events,
        this.remainingTime,
        this.sign
      )
      .then(() => {
        this.notificationsService.success('RACE_UPLOADED_SUCCESSFUL');
        this.router.navigate(['/mobile', 'dashboard']);
      })
      .catch(err => this.notificationsService.error('RACE_UPLOAD_ERROR'));

    this.fieldsService.endRunOnField(this.runSettings.field);
  }
}
