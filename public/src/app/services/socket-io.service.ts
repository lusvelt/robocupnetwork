import { Injectable } from '@angular/core';
import { TokenService } from './token.service';
import * as io from 'socket.io-client';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Observable';

@Injectable({
  providedIn: 'root'
})
export class SocketIoService {

  socket;

  constructor(private tokenService: TokenService) { }

  connect(namespace: string) {
    const token = this.tokenService.getToken();
    this.socket = io(environment.apiUrl + namespace, { 'query': 'token=' + token });
  }

  emit(eventName: string, args?: any, callback?) {
    this.socket.emit(eventName, args, callback);
  }

  on(eventName: string) {
    return new Observable(observer => {
      this.socket.on(eventName, data => observer.next(data));
    });
  }

}
