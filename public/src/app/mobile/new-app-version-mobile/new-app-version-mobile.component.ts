import { environment } from './../../../environments/environment';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-new-app-version-mobile',
  templateUrl: './new-app-version-mobile.component.html',
  styleUrls: ['./new-app-version-mobile.component.scss']
})
export class NewAppVersionMobileComponent implements OnInit {

  apiUrl: string;

  constructor() { }

  ngOnInit() {
    this.apiUrl = environment.apiUrl;
  }

}
