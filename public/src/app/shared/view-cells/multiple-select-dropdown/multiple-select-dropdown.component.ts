import { Component, OnInit, Input } from '@angular/core';
import { ViewCell } from 'ng2-smart-table';
import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';
import { EventEmitter } from 'events';
import * as _ from 'lodash';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'ngx-multiple-select-dropdown',
  templateUrl: './multiple-select-dropdown.component.html',
  styleUrls: ['./multiple-select-dropdown.component.scss']
})
export class MultipleSelectDropdownComponent implements ViewCell, OnInit {
  private showDropdown: boolean = false;

  @Input() value;
  @Input() rowData;
  items: any[];
  oldItems: any[];

  parentNotifier: EventEmitter = new EventEmitter();

  constructor(config: NgbDropdownConfig,
              translateService: TranslateService) {
    config.autoClose = false;
  }

  ngOnInit() {
    this.oldItems = _.cloneDeep(this.items);
  }

  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
    if (!this.showDropdown) {
      const changed = [];
      for (let i = 0; i < this.items.length; i++) {
        if (this.items[i].selected !== this.oldItems[i].selected)
          changed.push(this.items[i]);
      }
      if (changed.length > 0)
        this.notifyParent(changed);
    } else this.oldItems = _.cloneDeep(this.items);
  }

  notifyParent(changed) {
    this.parentNotifier.emit('change', changed);
  }

  trackByFn(index, item) {
    return item.id;
  }

}
