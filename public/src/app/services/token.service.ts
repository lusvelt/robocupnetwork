import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  setToken(token: string): void {
    localStorage.setItem(environment.tokenKey, token);
  }

  getToken(): string {
    return localStorage.getItem(environment.tokenKey);
  }
}
