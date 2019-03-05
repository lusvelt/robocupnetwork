import { Component, OnInit } from '@angular/core';
import { SocketIoService } from '../services/socket-io.service';

@Component({
    selector: 'ngx-mobileapp',
    template: `
    <ngx-one-column-layout>
      <router-outlet></router-outlet>
    </ngx-one-column-layout>
  `,



  })



  export class MobileComponent implements OnInit {
    constructor(private socketIoService: SocketIoService) { }
    ngOnInit() {
      this.socketIoService.connect('/clients');
    }

   }
