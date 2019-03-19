import { AuthService } from './auth.service';
import { SocketIoService } from './socket-io.service';
import { Injectable } from '@angular/core';

import * as _ from 'lodash';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RunService {

  constructor(private socketIoService: SocketIoService,
              private authService: AuthService) { }

  startRun(runSettings, team) {
    return this.socketIoService.send('startRun', { runSettings, team, referee: _.pick(this.authService.getUserInfo(), ['id']) });
  }

  getRuns() {
    return this.socketIoService.get('getRuns');
  }

  endRun(run, runSettings, toEliminate, isContestation, contestation, score, events, remainingTime) {
    return this.socketIoService.send('endRun', { run, runSettings, toEliminate, isContestation, contestation, score, events, remainingTime });
  }

  fastValidateRun(run) {
    return this.socketIoService.send('fastValidateRun', run);
  }

  deleteRun(run) {
    return this.socketIoService.send('deleteRun', run);
  }

  validateRunWithPoint(run) {
    return this.socketIoService.send('validateRunWithPoint', run);
  }

  getDataForRanking(phase) {
    return this.socketIoService.send('getDataForRanking', phase);
  }

  updateLiveScore(run, score) {
    return this.socketIoService.send('updateLiveScore', {run, score});
  }

  notify(eventName: string): Observable<any> {
    return new Observable(observer => this.socketIoService.on(eventName)
      .subscribe(data => observer.next(data)));
  }
}
