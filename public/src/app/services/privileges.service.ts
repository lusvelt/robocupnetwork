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

  notify(eventName: string): Observable<any> {
    return new Observable(observer => this.socketIoService.on(eventName)
                                        .subscribe(data => observer.next(data)));
  }

  getActions() {
    return this.socketIoService.get('getActions');
  }

  createRole(data) {
    return this.socketIoService.send('createRole', data);
  }

  createModule(data) {
    return this.socketIoService.send('createModule', data);
  }

  createAction(data) {
    return this.socketIoService.send('createAction', data);
  }

  removeAction(data) {
    return this.socketIoService.send('removeAction', data);
  }

  editAction(data) {
    return this.socketIoService.send('editAction', data);
  }

  updateSelectedActionTypes(action, changedActionTypes) {
    return this.socketIoService.send('updateSelectedActionTypes', { action, changedActionTypes });
  }

  updateSelectedAction(action, changedAction) {
    return this.socketIoService.send('updateSelectedAction', { action, changedAction });
  }

  getRoles() {
    return this.socketIoService.get('getRoles');
  }

  removeRole(data) {
    return this.socketIoService.send('removeRole', data);
  }

  editRole(data) {
    return this.socketIoService.send('editRole', data);
  }

  getModules() {
    return this.socketIoService.get('getModules');
  }

  editModule(data) {
    return this.socketIoService.send('editModule', data);
  }

  removeModule(data) {
    return this.socketIoService.send('removeModule', data);
  }

}
