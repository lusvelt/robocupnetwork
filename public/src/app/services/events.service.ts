import { Injectable } from '@angular/core';
import { SocketIoService } from './socket-io.service';
import { Observable } from 'rxjs/Observable';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  constructor(private socketIoService: SocketIoService) { }

  getEvents() {
    return this.socketIoService.get('getEvents');
  }

  createEvent(data) {
    return this.socketIoService.send('createEvent', data);
  }

  editEvent(data) {
    return this.socketIoService.send('editEvent', data);
  }

  removeEvent(data) {
    return this.socketIoService.send('removeEvent', data);
  }

  notify(eventName: string): Observable<any> {
    return new Observable(observer => this.socketIoService.on(eventName)
      .subscribe(data => observer.next(data)));
  }
}
