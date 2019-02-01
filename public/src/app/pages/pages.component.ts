import { TranslateService } from '@ngx-translate/core';
import { Component, OnInit } from '@angular/core';
import { MENU_ITEMS } from './pages-menu';
import { SocketIoService } from '../services/socket-io.service';
import { AuthService } from '../services/auth.service';
import * as _ from 'lodash';

@Component({
  selector: 'ngx-pages',
  template: `
    <ngx-sample-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-sample-layout>
  `,
})
export class PagesComponent implements OnInit {
  constructor(private translateService: TranslateService,
    private socketIoService: SocketIoService,
    private authService: AuthService) { }

  menu = _.cloneDeep(MENU_ITEMS);

  ngOnInit() {
    const promises = [];
    this.deleteUnauthorizedItems(this.menu);
    this.translateTitles(this.menu);
    this.socketIoService.connect('/clients');
    // Aggiungi event listener per vedere se si modifica il token lato server a causa di un cambio di privilegi
  }

  private deleteUnauthorizedItems(items) {
    for (let i = 0; i < items.length; i++) {
      if (!this.authService.canAccess(items[i].alias))
        delete items[i];
      else if (items[i].children)
        this.deleteUnauthorizedItems(items[i].children);
    }
  }

  private translateTitles(menuItems) {
    menuItems.forEach(async item => {
      if (this.authService.canAccess(item.alias)) {
        if (item.title)
          item.title = await this.translateService.get(item.title).toPromise();
        if (item.children)
          this.translateTitles(item.children);
      }
    });
  }
}
