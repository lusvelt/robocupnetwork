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

  getTeamsInManifestation(manifestation) {
    return this.socketIoService.send('getTeamsInManifestation', manifestation);
  }

  createTeam(team, manifestation) {
    return this.socketIoService.send('createTeam', {team, manifestation});
  }

  editTeam(team, manifestation) {
    return this.socketIoService.send('editTeam', {team, manifestation});
  }

  removeTeam(team, manifestation) {
    return this.socketIoService.send('removeTeam', {team, manifestation});
  }

  getCaptainFromId(id) {
    return this.socketIoService.send('getCaptainFromId', id);
  }

  notify(eventName: string): Observable<any> {
    return new Observable(observer => this.socketIoService.on(eventName)
      .subscribe(data => observer.next(data)));
  }
}
