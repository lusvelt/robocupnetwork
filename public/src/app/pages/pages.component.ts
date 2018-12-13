import { TranslateService } from '@ngx-translate/core';
import { Component, OnInit } from '@angular/core';
import { MENU_ITEMS } from './pages-menu';

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
  constructor(private translateService: TranslateService) { }

  menu = MENU_ITEMS;

  ngOnInit() {
    const promises = [];
    this.translateTitles(this.menu);
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
