import { HttpService } from './http.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PrivilegesService {

  constructor(private httpService: HttpService) { }

  getActionTypes() {
    return this.httpService.get('/getActionTypes');
  }

  createActionType(data) {
    return this.httpService.post('/createActionType', data);
  }

  editActionType(data) {
    return this.httpService.post('/editActionType', data);
  }

  removeActionType(id) {
    return this.httpService.post('/removeActionType', { id });
  }
}
