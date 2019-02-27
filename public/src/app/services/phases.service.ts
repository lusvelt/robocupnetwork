import { HttpService } from './http.service';
import { Injectable } from '@angular/core';
import { SocketIoService } from './socket-io.service';
import { Observable } from 'rxjs/Observable';

@Injectable({
  providedIn: 'root'
})
export class PhasesService {
  constructor(private socketIoService: SocketIoService) {}

  getPhases() {
    return this.socketIoService.get('getPhases');
  }

  createPhase(data) {
    return this.socketIoService.send('createPhase', data);
  }

  editPhase(data) {
    return this.socketIoService.send('editPhase', data);
  }

  updateStart(phase, startDate) {
    return this.socketIoService.send('updateStart', { phase, startDate});
  }

  updateEnd(phase, endDate) {
    return this.socketIoService.send('updateEnd', { phase, endDate});
  }

  removePhase(data) {
    return this.socketIoService.send('removePhase', data);
  }

  notify(eventName: string): Observable<any> {
    return new Observable(observer =>
      this.socketIoService.on(eventName).subscribe(data => observer.next(data))
    );
  }
}
