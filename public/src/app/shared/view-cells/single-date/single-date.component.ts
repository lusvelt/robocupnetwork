import { Component, OnInit, Input } from '@angular/core';
import { ViewCell } from 'ng2-smart-table';
import { EventEmitter } from 'events';
import * as _ from 'lodash';
import { NbDatepicker } from '@nebular/theme';

@Component({
  selector: 'ngx-single-date',
  templateUrl: './single-date.component.html',
  styleUrls: ['./single-date.component.scss']
})
export class SingleDateComponent implements ViewCell, OnInit {
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
    this.parentNotifier.emit('change', date);
  }

}
