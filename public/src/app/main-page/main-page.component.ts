import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'ngx-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {

  constructor(private translate: TranslateService) { }

  ngOnInit() {
  }

  languageSelect(language) {
    if (language === 'italian')
      this.translate.setDefaultLang('it');
    if (language === 'english')
      this.translate.setDefaultLang('en');
  }

}
