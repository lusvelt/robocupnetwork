import { Component, OnInit } from '@angular/core';
import { ParamsService } from '../../services/params.service';
import { TranslateService } from '@ngx-translate/core';

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

  isContestation: false;
  contestation: any;

  constructor(private paramsService: ParamsService, private translateService: TranslateService) { }

  ngOnInit() {
    const data = this.paramsService.getParams();
    this.category = data.category;
    this.runSettings = data.runSettings;
    this.team = data.team;
    this.events = data.events;
    this.score = data.score;
  }

}
