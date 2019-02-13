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

  reconnect() {
    this.connect('/clients');
  }

  emit(eventName: string, args?: any, callback?) {
    if (!args)
      this.socket.emit(eventName, callback);
    else
      this.socket.emit(eventName, args, callback);
  }

  get(eventName: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.socket.emit(eventName, undefined, response => {
        if (response instanceof Error) reject();
        else resolve(response);
      });
    });
  }

  send(eventName: string, data: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.socket.emit(eventName, data, response => {
        if (response instanceof Error) reject();
        else resolve(response);
      });
    });
  }

  on(eventName: string) {
    return new Observable(observer => this.socket.on(eventName, data => observer.next(data)));
  }

}
