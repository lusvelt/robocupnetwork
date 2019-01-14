import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateParserService {

  constructor() { }

  getDate(string) {
    const newDate = new Date(string);
    return newDate;
  }
}
