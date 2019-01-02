import { HttpService } from './http.service';
import { Injectable } from '@angular/core';
import { SocketIoService } from './socket-io.service';
import { Observable } from 'rxjs/Observable';

@Injectable({
  providedIn: 'root'
})
export class PrivilegesService {

  constructor(private socketIoService: SocketIoService) { }

  getActionTypes() {
    return this.socketIoService.get('getActionTypes');
  }

  createActionType(data) {
    return this.socketIoService.send('createActionType', data);
  }

  editActionType(data) {
    return this.socketIoService.send('editActionType', data);
  }

  removeActionType(data) {
    return this.socketIoService.send('removeActionType', data);
  }

  notifyActionTypes(eventName: string): Observable<any> {
    return new Observable(observer => this.socketIoService.on(eventName)
                                        .subscribe(data => observer.next(data)));
  }

}
