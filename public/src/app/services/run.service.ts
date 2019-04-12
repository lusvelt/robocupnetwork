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

  getRuns(limitRuns) {
    return this.socketIoService.send('getRuns', limitRuns);
  }

  endRun(run, runSettings, toEliminate, isContestation, contestation, score, events, remainingTime, sign) {
    return this.socketIoService.send('endRun', { run, runSettings, toEliminate, isContestation, contestation, score, events, remainingTime, sign });
  }

  fastValidateRun(run) {
    return this.socketIoService.send('fastValidateRun', run);
  }

  deleteRun(run) {
    return this.socketIoService.send('deleteRun', run);
  }

  getRunInfo(id) {
    return this.socketIoService.send('getRunInfo', id);
  }

  validateRunWithPoint(run) {
    return this.socketIoService.send('validateRunWithPoint', run);
  }

  getDataForRanking(phase) {
    return this.socketIoService.send('getDataForRanking', phase);
  }

  getArbitratedRunsById(user) {
    return this.socketIoService.send('getArbitratedRunsById', user);
  }

  updateLiveScore(run, score) {
    return this.socketIoService.send('updateLiveScore', {run, score});
  }

  notify(eventName: string): Observable<any> {
    return new Observable(observer => this.socketIoService.on(eventName)
      .subscribe(data => observer.next(data)));
  }
}
