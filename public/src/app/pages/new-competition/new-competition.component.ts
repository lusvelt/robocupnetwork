import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'ngx-new-competition',
  templateUrl: './new-competition.component.html',
  styleUrls: ['./new-competition.component.scss']
})
export class NewCompetitionComponent implements OnInit {

  constructor(private translateService: TranslateService) { }

  ngOnInit() {
  }

}
