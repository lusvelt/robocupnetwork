import { Component, Input, OnInit } from '@angular/core';
import { ViewCell } from 'ng2-smart-table';
import { EventEmitter } from 'events';

@Component({
  selector: 'ngx-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss']
})
export class CheckboxComponent implements ViewCell, OnInit {
  @Input() value;
  @Input() rowData;
  checkboxValue;

  parentNotifier: EventEmitter = new EventEmitter();

  constructor() { }

  ngOnInit() {
    this.checkboxValue = this.rowData.dependsOnManifestation;
  }

  notifyParent(event) {
    this.parentNotifier.emit('change', event.returnValue);
  }

}
