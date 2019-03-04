import { Injectable } from '@angular/core';
import { SocketIoService } from './socket-io.service';
import { Observable } from 'rxjs/Observable';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  constructor(private socketIoService: SocketIoService) { }

  getEventsInCategory(category) {
    return this.socketIoService.send('getEventsInCategory', category);
  }

  createEventInCategory(event, category) {
    return this.socketIoService.send('createEventInCategory', {event, category});
  }

  editEvent(event, category) {
    return this.socketIoService.send('editEvent', {event, category});
  }

  removeEvent(event, category) {
    return this.socketIoService.send('removeEvent', {event, category});
  }

  notify(eventName: string): Observable<any> {
    return new Observable(observer => this.socketIoService.on(eventName)
      .subscribe(data => observer.next(data)));
  }
}
