import { ParamsService } from './../../services/params.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
// import * as Timer from 'tiny-timer';


@Component({
  selector: 'ngx-scoring-run-mobile',
  templateUrl: './scoring-run-mobile.component.html',
  styleUrls: ['./scoring-run-mobile.component.scss']
})
export class ScoringRunMobileComponent implements OnInit {
  category: any;
  runSettings: any;
  team: any;

  events = [];

  score: number = 0;
  attempt: number = 1;
  zone: number = 1;

  livingVictimsRescued = 0;
  deadVictimsRescued = 0;
  lacksOfProgressAfterTheFinalCheck = 0;

  pointsForALivingVictim = 0;
  pointsForADeadVictim = 0;

  subtractedPointsForLackOfProgressAfterTheFinalCheck = 0;

  timer: any;
  time: number;

  constructor(private route: ActivatedRoute, private paramsService: ParamsService) { }

  ngOnInit() {
    const params = this.paramsService.getParams();
    this.category = params.category;
    this.runSettings = params.runSettings;
    this.team = params.team;

    /*this.timer = new Timer([{ interval: 1000 }]);
    this.timer.start(this.runSettings.maxTime * 1000);
    this.timer.on('tick', (ms) => console.log('tick', ms));*/
  }

  fireEvent(event) {
    this.evaluate(event.pointsJSCalculator);
    this.events.push(event);
  }

  nextZone() {
    this.attempt = 1;
    this.zone++;
  }

  checkpoint() {
    if ( this.attempt === 1 )
      this.score += this.runSettings.checkpoints[this.zone - 1] * 5;
    if ( this.attempt === 2 )
      this.score += this.runSettings.checkpoints[this.zone - 1] * 3;
    if ( this.attempt === 3 )
      this.score += this.runSettings.checkpoints[this.zone - 1] * 1;
    this.nextZone();
  }

  deadVictim() {
    if ( this.livingVictimsRescued === this.runSettings.aliveVictims ) {
      if (this.runSettings.evacuationType === 'high') {
        this.pointsForADeadVictim = ( 30 - ( 5 * this.lacksOfProgressAfterTheFinalCheck ) );
        if ( this.pointsForADeadVictim < 0)
          this.pointsForADeadVictim = 0;
        this.score +=  this.pointsForADeadVictim;
      } else {
        this.pointsForADeadVictim = ( 20 - ( 5 * this.lacksOfProgressAfterTheFinalCheck ) );
        if ( this.pointsForADeadVictim < 0)
          this.pointsForADeadVictim = 0;
        this.score +=  this.pointsForADeadVictim;
      }
    } else {
      this.pointsForADeadVictim = ( 5 - ( 5 * this.lacksOfProgressAfterTheFinalCheck ) );
        if ( this.pointsForADeadVictim < 0)
          this.pointsForADeadVictim = 0;
        this.score +=  this.pointsForADeadVictim;
    }
    this.deadVictimsRescued ++;

  }

  livingVictim() {
    if (this.runSettings.evacuationType === 'high') {
      this.pointsForALivingVictim = ( 40 - ( 5 * this.lacksOfProgressAfterTheFinalCheck ) );
        if ( this.pointsForALivingVictim < 0)
          this.pointsForALivingVictim = 0;
        this.score +=  this.pointsForALivingVictim;
    } else {
      this.pointsForALivingVictim = ( 30 - ( 5 * this.lacksOfProgressAfterTheFinalCheck ) );
        if ( this.pointsForALivingVictim < 0)
          this.pointsForALivingVictim = 0;
        this.score +=  this.pointsForALivingVictim;
    }
    this.livingVictimsRescued ++;

  }

  lackOfProgress() {
    if (this.zone > this.runSettings.numberOfCheckpoints) {
        this.lacksOfProgressAfterTheFinalCheck ++;
        this.subtractedPointsForLackOfProgressAfterTheFinalCheck = ( 5 * this.livingVictimsRescued ) + ( 5 * this.deadVictimsRescued );
        this.score -= this.subtractedPointsForLackOfProgressAfterTheFinalCheck;
    }
    this.attempt ++;
  }

  endOfPlay() { }

  evaluate(command: string) {
    this.events.push();
    eval(command);
  }

}
