import { ParamsService } from './../../services/params.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { CountdownComponent } from 'ngx-countdown';
import { ModalService } from '../../services/modal.service';
import { FieldsService } from '../../services/fields.service';
import { RunService } from '../../services/run.service';
import { TranslateService } from '@ngx-translate/core';
// import * as Timer from 'tiny-timer';


@Component({
  selector: 'ngx-scoring-run-mobile',
  templateUrl: './scoring-run-mobile.component.html',
  styleUrls: ['./scoring-run-mobile.component.scss']
})
export class ScoringRunMobileComponent implements OnInit {
  counter: CountdownComponent;
  category: any;
  runSettings: any;
  team: any;
  run: any;

  subtractablePoints: number = 0;

  events = [];

  score: number = 5;
  attempt: number = 1;
  zone: number = 1;
  triangle: number = Math.floor(Math.random() * 4) + 1;


  livingVictimsRescued = 0;
  deadVictimsRescued = 0;
  lacksOfProgressAfterTheFinalCheck = 0;

  pointsForALivingVictim = 0;
  pointsForADeadVictim = 0;

  subtractedPointsForLackOfProgressAfterTheFinalCheck = 0;

  timer: any;
  time: number;
  remainingTime = 0;

  constructor(private route: ActivatedRoute, private router: Router, private paramsService: ParamsService, private modalService: ModalService, private runService: RunService, private fieldsService: FieldsService, private translateService: TranslateService) { }

  ngOnInit() {
    const params = this.paramsService.getParams();
    this.category = params.category;
    this.runSettings = params.runSettings;
    this.team = params.team;
    this.run = params.run;
  }

  async fireEvent(event) {
    this.evaluate(event.pointsJSCalculator);
    event.name = await this.translateService.get(event.name).toPromise();
    this.events.push(event);
    this.fieldsService.updateScoreOnField(this.runSettings.field, this.score);
    this.runService.updateLiveScore(this.run, this.score);
  }

  nextZone() {
    if (!(this.zone > this.runSettings.numberOfCheckpoints)) {
      this.attempt = 1;
      this.zone++;
    }
  }

  randomTriangle() {
    this.triangle = Math.floor(Math.random() * 4) + 1;
  }

  checkpoint() {
    if (!(this.zone > this.runSettings.numberOfCheckpoints)) {
      if ( this.attempt === 1 )
        this.score += this.runSettings.checkpoints[this.zone - 1] * 5;
      if ( this.attempt === 2 )
        this.score += this.runSettings.checkpoints[this.zone - 1] * 3;
      if ( this.attempt === 3 )
        this.score += this.runSettings.checkpoints[this.zone - 1] * 1;
      this.nextZone();
    }
  }

  deadVictim() {
    if (this.deadVictimsRescued !== this.runSettings.deadVictims) {
      if ( this.livingVictimsRescued === this.runSettings.aliveVictims ) {
        if (this.runSettings.evacuationType === 'high') {
          this.pointsForADeadVictim = 30;
          this.score +=  this.pointsForADeadVictim;
          this.subtractablePoints += this.pointsForADeadVictim;
        } else {
          this.pointsForADeadVictim = 20;
          this.score +=  this.pointsForADeadVictim;
          this.subtractablePoints += this.pointsForADeadVictim;
        }
      } else {
        this.pointsForADeadVictim = 5;
          this.score +=  this.pointsForADeadVictim;
          this.subtractablePoints += this.pointsForADeadVictim;
      }
      this.deadVictimsRescued ++;
    }
  }

  livingVictim() {
    if (this.livingVictimsRescued !== this.runSettings.aliveVictims) {
      if (this.runSettings.evacuationType === 'high') {
        this.pointsForALivingVictim = 40;
          this.score +=  this.pointsForALivingVictim;
          this.subtractablePoints += this.pointsForALivingVictim;
      } else {
        this.pointsForALivingVictim = 30;
          this.score +=  this.pointsForALivingVictim;
          this.subtractablePoints += this.pointsForALivingVictim;
      }
      this.livingVictimsRescued ++;
    }
  }

  lackOfProgress() {
    if (!this.runSettings.entryLevel) {
      if (this.zone > this.runSettings.numberOfCheckpoints) {
          this.lacksOfProgressAfterTheFinalCheck ++;
          this.subtractedPointsForLackOfProgressAfterTheFinalCheck = ( 5 * this.livingVictimsRescued ) + ( 5 * this.deadVictimsRescued );
          if (this.subtractablePoints < this.subtractedPointsForLackOfProgressAfterTheFinalCheck) {
            this.subtractedPointsForLackOfProgressAfterTheFinalCheck = this.subtractablePoints;
            this.subtractablePoints = 0;
          } else {
            this.subtractablePoints -= this.subtractedPointsForLackOfProgressAfterTheFinalCheck;
          }
          this.score -= this.subtractedPointsForLackOfProgressAfterTheFinalCheck;
      }
    }
    this.attempt ++;
  }

  changeStatus(cd1) {
    if (cd1.paused) {
      cd1.resume();
    } else {
      cd1.pause();
    }
  }

  onFinished() {
    this.modalService.alert('TIME_ENDED', 'GO_TO_RESUME')
    .then(result => {
      this.paramsService.setParams({
        run: this.run,
        runSettings: this.runSettings,
        team: this.team,
        category: this.category,
        events: this.events,
        score: this.score,
        remainingTime: this.remainingTime
      });
      this.router.navigate(['/mobile', 'after-run']);
    });
  }


  endOfPlay() { }

  endRun(cd1) {
    cd1.pause();
    this.modalService.confirm('ARE_YOU_SURE_YOU_WANT_TO_END')
        .then(confirmation => {
          if (confirmation) {
            this.remainingTime = cd1;
            this.onFinished();
          } else {
            cd1.resume();
          }
        });
  }

  exit() {
    this.score += 20;
  }

  evaluate(command: string) {
    this.events.push();
    eval(command);
  }

}
