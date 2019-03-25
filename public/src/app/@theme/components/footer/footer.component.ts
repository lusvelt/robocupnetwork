import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'ngx-footer',
  styleUrls: ['./footer.component.scss'],
  template: `
    <span class="created-by">
      {{ 'CREATED_BY' | translate }}
      <b><a href='http://iisvoltapescara.gov.it/' target="_blank">I.I.S A.Volta Pescara</a></b> 2018-2019
    </span>
    <div class="socials">
      <a href="https://github.com/" target="_blank" class="ion ion-social-github"></a>
      <a href="https://it-it.facebook.com/Voltapescara.official/" target="_blank" class="ion ion-social-facebook"></a>
    </div>
  `,
})
export class FooterComponent {
  constructor(translateService: TranslateService) { }
}
