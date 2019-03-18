import { Injectable } from '@angular/core';
import { SocketIoService } from './socket-io.service';
import { Observable } from 'rxjs/Observable';

@Injectable({
  providedIn: 'root'
})
export class FieldsService {

  constructor(private socketIoService: SocketIoService) { }

  findFieldsFromPhaseId(phase) {
    return this.socketIoService.send('findFieldsFromPhaseId', phase);
  }

  resetAllFields(phase) {
    return this.socketIoService.send('resetAllFields', phase);
  }

  updateFieldStatus(field, team) {
    return this.socketIoService.send('updateFieldStatus', {field, team});
  }

  endRunOnField(field) {
    return this.socketIoService.send('endRunOnField', field);
  }

  updateScoreOnField(field, score) {
    return this.socketIoService.send('updateScoreOnField', {field, score});
  }

  notify(eventName: string): Observable<any> {
    return new Observable(observer => this.socketIoService.on(eventName)
      .subscribe(data => observer.next(data)));
  }
}
