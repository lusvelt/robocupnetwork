import { HttpService } from './http.service';
import { Injectable } from '@angular/core';
import { SocketIoService } from './socket-io.service';
import { Observable } from 'rxjs/Observable';

@Injectable({
  providedIn: 'root'
})
export class SchoolService {

  constructor(private socketIoService: SocketIoService) { }

  getSchools() {
    return this.socketIoService.get('getSchools');
  }

  createSchool(data) {
    return this.socketIoService.send('createSchool', data);
  }

  editSchool(data) {
    return this.socketIoService.send('editSchool', data);
  }

  removeSchool(data) {
    return this.socketIoService.send('removeSchool', data);
  }

  notify(eventName: string): Observable<any> {
    return new Observable(observer => this.socketIoService.on(eventName)
      .subscribe(data => observer.next(data)));
  }
}
