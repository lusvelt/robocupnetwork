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

  updateSelectedModules(action, changedModules) {
    return this.socketIoService.send('updateSelectedModules', { action, changedModules });
  }

  updateSelectedAction(action, changedAction) {
    return this.socketIoService.send('updateSelectedAction', { action, changedAction });
  }

  updateUsersBasicRoles(user, changedBasicRoles) {
    return this.socketIoService.send('updateUsersBasicRoles', { user, changedBasicRoles});
  }

  updateUserHasRolesInManifestation(user, manifestation) {
    return this.socketIoService.send('updateUserHasRolesInManifestation', { user, manifestation});
  }

  updateIsAdmin(user, value) {
    return this.socketIoService.send('updateIsAdmin', {user, value});
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

  updateActionManifestationDependency(action, value) {
    return this.socketIoService.send('updateActionManifestationDependency', { action, value });
  }

  updateRoleManifestationDependency(role, value) {
    return this.socketIoService.send('updateRoleManifestationDependency', { role, value });
  }

  getRolesFromId(id) {
    return this.socketIoService.send('getRolesFromId', id);
  }

  getManifestationsFromId(id) {
    return this.socketIoService.send('getManifestationsFromId', id);
  }

  getRolesInManifestationFromId(userId, manifestationId) {
    return this.socketIoService.send('getRolesInManifestationFromId', { userId, manifestationId});
  }

  getBasicRoles() {
    return this.socketIoService.get('getBasicRoles');
  }
}
