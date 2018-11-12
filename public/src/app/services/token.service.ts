import { values } from './../config/values.config';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  setToken(token: string): void {
    localStorage.setItem(values.tokenKey, token);
  }

  getToken(): string {
    return localStorage.getItem(values.tokenKey);
  }

  isTokenSet(): boolean {
    if (this.getToken())
      return true;
    else return false;
  }
}
