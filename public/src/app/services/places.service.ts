import { HttpService } from './http.service';
import { Injectable } from '@angular/core';
import { SocketIoService } from './socket-io.service';
import { Observable } from 'rxjs/Observable';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {

  constructor(private socketIoService: SocketIoService) { }

  getPlaces() {
    return this.socketIoService.get('getPlaces');
  }

  createPlace(data) {
    return this.socketIoService.send('createPlace', data);
  }

  editPlace(data) {
    return this.socketIoService.send('editPlace', data);
  }

  removePlace(data) {
    return this.socketIoService.send('removePlace', data);
  }

  notify(eventName: string): Observable<any> {
    return new Observable(observer => this.socketIoService.on(eventName)
      .subscribe(data => observer.next(data)));
  }
}
