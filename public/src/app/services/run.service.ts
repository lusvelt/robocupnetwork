import { AuthService } from './auth.service';
import { SocketIoService } from './socket-io.service';
import { Injectable } from '@angular/core';

import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class RunService {

  constructor(private socketIoService: SocketIoService,
              private authService: AuthService) { }

  startRun(runSettings, team) {
    return this.socketIoService.send('startRun', { runSettings, team, referee: _.pick(this.authService.getUserInfo(), ['id']) });
  }

  endRun(run, runSettings, toEliminate, isContestation, contestation, score, events) {
    return this.socketIoService.send('endRun', { run, runSettings, toEliminate, isContestation, contestation, score, events });
  }
}
