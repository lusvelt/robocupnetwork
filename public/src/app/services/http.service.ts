import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient, private tokenService: TokenService) { }

  private getHeaders(): HttpHeaders {
    const token = this.tokenService.getToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${ token }`
    });
    return headers;
  }

  post(endPoint: string, data: any, auth: boolean = true): Promise<any> {
    const options: any = {};
    if (auth)
      options.headers = this.getHeaders();
    return this.http.post(environment.apiUrl + endPoint, data, options).toPromise();
  }

  get(endPoint: string, auth: boolean = true): Promise<any> {
    const options: any = {};
    if (auth)
      options.headers = this.getHeaders();
    return this.http.get(environment.apiUrl + endPoint, options).toPromise();
  }

}
