import { values } from './../config/values.config';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor(private jwtHelper: JwtHelperService) { }

  setToken(token: string): void {
    localStorage.setItem(values.tokenKey, token);
  }

  getToken(): string {
    return localStorage.getItem(values.tokenKey);
  }

  getDecodedToken() {
    return this.jwtHelper.decodeToken(this.getToken());
  }

  isTokenSet(): boolean {
    if (this.getToken())
      return true;
    else return false;
  }
}
