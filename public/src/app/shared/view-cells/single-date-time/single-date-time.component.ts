import { Component, OnInit, Input } from '@angular/core';
import { ViewCell } from 'ng2-smart-table';
import { EventEmitter } from 'events';
import * as _ from 'lodash';
import { NbDatepicker } from '@nebular/theme';

@Component({
  selector: 'ngx-single-date-time',
  templateUrl: './single-date-time.component.html',
  styleUrls: ['./single-date-time.component.scss']
})
export class SingleDateTimeComponent implements ViewCell, OnInit {
  @Input() value: any;
  @Input() rowData: any;
  date: Date;
  oldDate: Date;
  user: any [] = [] ;
  internalKey: string;

  parentNotifier: EventEmitter = new EventEmitter;
  constructor() { }

  ngOnInit() {
    this.date = new Date(this.rowData[this.internalKey]);
  }

  onDateChange(date: any) {
    // console.log(this._dateTimeLocal);
    // this.parentNotifier.emit('change', date);
  }


}
