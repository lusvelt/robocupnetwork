import { TablesService } from './../services/tables.service';
import { HttpService } from './../services/http.service';
import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { rankingConfig } from '../config/tables.config';
import { DataSource } from '../classes/data-source.class';

@Component({
  selector: 'ngx-public-ranking',
  templateUrl: './public-ranking.component.html',
  styleUrls: ['./public-ranking.component.scss']
})
export class PublicRankingComponent implements OnInit {

  source: DataSource = new DataSource();
  settings;

  constructor(private http: HttpService, private tablesService: TablesService) { }

  ngOnInit() {
    this.settings = this.tablesService.getSettings(rankingConfig, {
      rank: {
        title: 'Posizione',
        type: 'number',
        addable: false,
        editable: false
      },
      team: {
        title: 'Squadra',
        type: 'text',
        addable: false,
        editable: false
      },
      school: {
        title: 'Scuola',
        type: 'text',
        addable: false,
        editable: false
      },
      ageRange: {
        title: 'Età',
        type: 'text',
        addable: false,
        editable: false
      },
      score: {
        title: 'Punti',
        type: 'number',
        addable: false,
        editable: false
      },
      numberOfRuns: {
        title: 'Gare',
        type: 'number',
        addable: false,
        editable: false
      }
    });
    this.http.get('/ranking/3')
      .then(data => {
        for (let i = 0; i < data.length; i++) {
          data[i].rank = i + 1;
        }
        this.source.load(data);
        this.source.refresh();
      });
  }

}
