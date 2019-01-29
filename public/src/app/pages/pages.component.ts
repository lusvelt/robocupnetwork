import { TranslateService } from '@ngx-translate/core';
import { Component, OnInit } from '@angular/core';
import { MENU_ITEMS } from './pages-menu';
import { SocketIoService } from '../services/socket-io.service';

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
    private socketIoService: SocketIoService) { }

  menu = MENU_ITEMS;

  ngOnInit() {
    const promises = [];
    this.translateTitles(this.menu);
    this.socketIoService.connect('/clients');
    // Aggiungi event listener per vedere se si modifica il token lato server a causa di un cambio di privilegi
  }

  private translateTitles(menuItems) {
    menuItems.forEach(async item => {
      if (item.title)
        item.title = await this.translateService.get(item.title).toPromise();
      if (item.children)
        this.translateTitles(item.children);
    });
  }
}
