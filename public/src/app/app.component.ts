/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { TranslateService } from '@ngx-translate/core';
import { Component, OnInit } from '@angular/core';
import { AnalyticsService } from './@core/utils/analytics.service';

@Component({
  selector: 'ngx-app',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent implements OnInit {

  constructor(private analytics: AnalyticsService, private translate: TranslateService) { }

  ngOnInit(): void {
    this.analytics.trackPageViews();
    this.translate.setDefaultLang('it');
  }
}
