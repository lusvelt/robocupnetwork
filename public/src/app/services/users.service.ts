import { HttpService } from './http.service';
import { Injectable } from '@angular/core';
import { SocketIoService } from './socket-io.service';
import { Observable } from 'rxjs/Observable';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private socketIoService: SocketIoService) { }

  getUsers() {
    return this.socketIoService.get('getUsers');
  }

  createUser(data) {
    return this.socketIoService.send('createUser', data);
  }

  editUser(data) {
    return this.socketIoService.send('editUser', data);
  }

  updateUserBirthdate(user, changedBirthdate) {
    return this.socketIoService.send('updateUserBirthdate', { user, changedBirthdate });
  }

  removeUser(data) {
    return this.socketIoService.send('removeUser', data);
  }

  notify(eventName: string): Observable<any> {
    return new Observable(observer => this.socketIoService.on(eventName)
      .subscribe(data => observer.next(data)));
  }
}
