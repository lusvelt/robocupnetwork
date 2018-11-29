import { Injectable } from '@angular/core';
import { TokenService } from './token.service';
import * as io from 'socket.io-client';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SocketIoService {

  constructor(private tokenService: TokenService) { }

  getConnection(namespace: string) {
    const token = this.tokenService.getToken();
    return io(environment.apiUrl + namespace, { 'query': 'token=' + token });
  }
}
