import { HttpService } from './http.service';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

declare var cordova: any;

@Injectable({
  providedIn: 'root'
})
export class MobileService {

  constructor(private http: HttpService) { }

  async checkForUpdates() {
    if (environment.mobile) {
      const versionNumber = await cordova.getAppVersion.getVersionNumber();
      const latestVersion = (await this.http.get('/appLatestVersion')).mobileAppVersion;
      return versionNumber !== latestVersion;
    } else return false;
  }
}
