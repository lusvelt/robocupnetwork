import { HttpService } from './http.service';
import { Injectable } from '@angular/core';
import { SocketIoService } from './socket-io.service';
import { Observable } from 'rxjs/Observable';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class PhasesService {
  constructor(private socketIoService: SocketIoService, private authService: AuthService) {}

  getPhasesInManifestation() {
    return this.socketIoService.send('getPhasesInManifestation', this.authService.getManifestation());
  }

  createPhase(phase, manifestation) {
    return this.socketIoService.send('createPhase', {phase, manifestation});
  }

  editPhase(phase, manifestation) {
    return this.socketIoService.send('editPhase', {phase, manifestation});
  }

  updateStart(phase, manifestation, startDate) {
    return this.socketIoService.send('updatePhaseStart', {phase, manifestation, startDate});
  }

  updateEnd(phase, manifestation, endDate) {
    return this.socketIoService.send('updatePhaseEnd', {phase, manifestation, endDate});
  }
  updateTeamsInPhase(phase, teams) {
    return this.socketIoService.send('updateTeamsInPhase', {phase, teams});
  }

  removePhase(phase, manifestation) {
    return this.socketIoService.send('removePhase', {phase, manifestation});
  }

  getTeamsInPhase(phase) {
    return this.socketIoService.send('getTeamsInPhase', phase);
  }

  notify(eventName: string): Observable<any> {
    return new Observable(observer =>
      this.socketIoService.on(eventName).subscribe(data => observer.next(data))
    );
  }
}
