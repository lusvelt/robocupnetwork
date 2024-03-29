import { Component, OnDestroy } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { takeWhile } from 'rxjs/operators';

// TODO: move layouts into the framework
@Component({
  selector: 'ngx-one-column-layout',
  styleUrls: ['./one-column.layout.scss'],
  template: `
    <nb-layout>

    <nb-layout-column class="main-content">
    <ng-content select="router-outlet"></ng-content>
  </nb-layout-column>

    </nb-layout>
  `,
})
export class OneColumnLayoutComponent implements OnDestroy {

  private alive = true;

  currentTheme: string;

  constructor(protected themeService: NbThemeService) {
    this.themeService.getJsTheme()
      .pipe(takeWhile(() => this.alive))
      .subscribe(theme => {
        this.currentTheme = theme.name;
    });
  }

  ngOnDestroy() {
    this.alive = false;
  }
}
