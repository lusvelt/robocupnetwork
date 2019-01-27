import { HttpService } from './http.service';
import { Injectable } from '@angular/core';
import { SocketIoService } from './socket-io.service';
import { Observable } from 'rxjs/Observable';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  constructor(private socketIoService: SocketIoService) { }

  getTeams() {
    return this.socketIoService.get('getTeams');
  }

  createTeam(data) {
    return this.socketIoService.send('createTeam', data);
  }

  editTeam(data) {
    return this.socketIoService.send('editTeam', data);
  }

  removeTeam(data) {
    return this.socketIoService.send('removeTeam', data);
  }

  notify(eventName: string): Observable<any> {
    return new Observable(observer => this.socketIoService.on(eventName)
      .subscribe(data => observer.next(data)));
  }
}
