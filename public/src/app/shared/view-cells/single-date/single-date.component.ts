import { Component, OnInit, Input } from '@angular/core';
import { ViewCell } from 'ng2-smart-table';

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
  user = [];
  constructor() { }

  ngOnInit() {
  }

}
