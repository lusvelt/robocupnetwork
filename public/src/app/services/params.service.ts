import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ParamsService {

  params: any;

  constructor() { }

  setParams(params: any) {
    this.params = params;
  }

  getParams() {
    return this.params;
  }
}
