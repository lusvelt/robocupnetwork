import { HttpService } from './http.service';
import { Injectable } from '@angular/core';
import { SocketIoService } from './socket-io.service';
import { Observable } from 'rxjs/Observable';

@Injectable({
  providedIn: 'root'
})
export class ManifestationsService {
  constructor(private socketIoService: SocketIoService) {}

  getManifestations() {
    return this.socketIoService.get('getManifestations');
  }

  createManifestation(data) {
    return this.socketIoService.send('createManifestation', data);
  }

  editManifestation(data) {
    return this.socketIoService.send('editManifestation', data);
  }

  updateStart(manifestation, startDate) {
    return this.socketIoService.send('updateStart', { manifestation, startDate});
  }

  updateEnd(manifestation, endDate) {
    return this.socketIoService.send('updateEnd', { manifestation, endDate});
  }

  getPlaceFromId(id) {
    return this.socketIoService.send('getPlaceFromId', id);
  }

  removeManifestation(data) {
    return this.socketIoService.send('removeManifestation', data);
  }

  notify(eventName: string): Observable<any> {
    return new Observable(observer =>
      this.socketIoService.on(eventName).subscribe(data => observer.next(data))
    );
  }
}
