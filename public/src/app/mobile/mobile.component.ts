import { Component, OnInit } from '@angular/core';
import { SocketIoService } from '../services/socket-io.service';

declare var device;

@Component({
  selector: 'ngx-mobileapp',
  template: `
    <ngx-one-column-layout>
      <router-outlet></router-outlet>
    </ngx-one-column-layout>`
})
export class MobileComponent implements OnInit {
  constructor() { }
  ngOnInit() {
    document.addEventListener('deviceready', onDeviceReady, false);

    function onDeviceReady() {
      function onBackKeyDown() { }
      if (device.platform === 'android' || device.platform === 'Android') {
        document.addEventListener('backbutton', onBackKeyDown, false);
      }
    }
  }
}
