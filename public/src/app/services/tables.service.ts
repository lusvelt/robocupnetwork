import { TranslateService } from '@ngx-translate/core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TablesService {

  constructor(private translateService: TranslateService) { }

  getSettings(configObj, columns) {
    const settings: any = { columns };
    Object.assign(settings, configObj);
    this.translateTitles(settings);
    return settings;
  }

  async translateTitles(settings: any) {
    settings.actions.columnTitle = await this.translateService.get(settings.actions.columnTitle).toPromise();
    Object.keys(settings.columns).forEach(async key => {
      const column = settings.columns[key];
      if (column.title)
        column.title = await this.translateService.get(column.title).toPromise();
    });
  }
}
