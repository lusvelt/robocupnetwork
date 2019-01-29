import { UserCredentialsInterface } from './../interfaces/user-credentials.interface';
import { UserInterface } from './../interfaces/user.interface';
import { TokenService } from './token.service';
import { Observable } from 'rxjs/Observable';
import { HttpService } from './http.service';
import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { SocketIoService } from './socket-io.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpService, private tokenService: TokenService, private userService: UserService, private socketIoService: SocketIoService) { }

  login(userCredentials: UserCredentialsInterface): Promise<any> {
    const httpRequest: Promise<any> = this.http.post('/login', userCredentials, false);
    httpRequest.then((response: any) => this.tokenService.setToken(response.token));
    return httpRequest;
  }

  register(user: UserInterface): Promise<any> {
    return this.http.post('/register', user, false);
  }

  selectManifestation(manifestation) {
    const user = this.userService.getUserInfo();
    const promise = this.socketIoService.send('selectManifestation', { manifestation, user });

    promise.then(result => this.tokenService.setToken(result.token));

    return promise;
  }

}
