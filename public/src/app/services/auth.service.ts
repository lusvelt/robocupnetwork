import { UserCredentialsInterface } from './../interfaces/user-credentials.interface';
import { UserInterface } from './../interfaces/user.interface';
import { TokenService } from './token.service';
import { Observable } from 'rxjs/Observable';
import { HttpService } from './http.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpService, private tokenService: TokenService) { }

  login(userCredentials: UserCredentialsInterface): Observable<any> {
    const httpRequest: Observable<any> = this.http.post('/login', userCredentials);
    httpRequest.subscribe((response: any) => this.tokenService.setToken(response.token));
    return httpRequest;
  }

  register(user: UserInterface): Observable<any> {
    return this.http.post('/register', user);
  }

}
