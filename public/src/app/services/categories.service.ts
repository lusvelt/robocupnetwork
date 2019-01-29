import { HttpService } from './http.service';
import { Injectable } from '@angular/core';
import { SocketIoService } from './socket-io.service';
import { Observable } from 'rxjs/Observable';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private socketIoService: SocketIoService) { }

  getCategories() {
    return this.socketIoService.get('getCategories');
  }

  createCategory(data) {
    return this.socketIoService.send('createCategory', data);
  }

  editCategory(data) {
    return this.socketIoService.send('editCategory', data);
  }

  removeCategory(data) {
    return this.socketIoService.send('removeCategory', data);
  }

  notify(eventName: string): Observable<any> {
    return new Observable(observer => this.socketIoService.on(eventName)
      .subscribe(data => observer.next(data)));
  }
}
