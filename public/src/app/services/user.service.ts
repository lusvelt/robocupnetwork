import { TokenService } from './token.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private tokenService: TokenService) { }

  getUserInfo() {
    // lodash se volete eliminare o aggiungere campi al json returnato dal tokenService
    return this.tokenService.getDecodedToken();
  }

  getFullName(): string {
    const currentUser = this.getUserInfo();
    return currentUser.name + ' ' + currentUser.surname;
  }

}
