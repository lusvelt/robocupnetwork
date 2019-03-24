import { Component } from '@angular/core';

import { StateService } from '../../../@core/data/state.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'ngx-theme-settings',
  styleUrls: ['./theme-settings.component.scss'],
  template: `
    <h6>{{'LANGUAGE'|translate}}</h6>
    <div class="settings-row">
      <a (click)="languageSelect('italian')">
        <img src="./../../../../assets/images/italy.png" width="20px" height="20px">
      </a>
      <a (click)="languageSelect('english')">
        <img src="./../../../../assets/images/united-kingdom.png" width="20px" height="20px">
      </a>
    </div>
  `,
})
export class ThemeSettingsComponent {

  layouts = [];
  sidebars = [];

  constructor(protected stateService: StateService, private translateService: TranslateService) {
    this.stateService.getLayoutStates()
      .subscribe((layouts: any[]) => this.layouts = layouts);

    this.stateService.getSidebarStates()
      .subscribe((sidebars: any[]) => this.sidebars = sidebars);
  }

  layoutSelect(layout: any): boolean {
    this.layouts = this.layouts.map((l: any) => {
      l.selected = false;
      return l;
    });

    layout.selected = true;
    this.stateService.setLayoutState(layout);
    return false;
  }

  sidebarSelect(sidebars: any): boolean {
    this.sidebars = this.sidebars.map((s: any) => {
      s.selected = false;
      return s;
    });

    sidebars.selected = true;
    this.stateService.setSidebarState(sidebars);
    return false;
  }

  languageSelect(language) {
    if (language === 'italian')
      this.translateService.setDefaultLang('it');
    if (language === 'english')
      this.translateService.setDefaultLang('en');
  }
}
