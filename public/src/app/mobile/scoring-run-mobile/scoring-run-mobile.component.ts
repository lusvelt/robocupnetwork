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

  evaluate(command: string) {
    this.events.push();
    eval(command);
  }

}
