import { Component, Input, OnInit } from '@angular/core';
import { ViewCell } from 'ng2-smart-table';
import { EventEmitter } from 'events';

@Component({
  selector: 'ngx-view-only-checkbox',
  templateUrl: './view-only-checkbox.component.html',
  styleUrls: ['./view-only-checkbox.component.scss']
})
export class ViewOnlyCheckboxComponent implements ViewCell, OnInit {
  @Input() value;
  @Input() rowData;
  checkboxValue;

  constructor() { }

  ngOnInit() {
    this.checkboxValue = this.rowData.dependsOnManifestation;
  }

}
