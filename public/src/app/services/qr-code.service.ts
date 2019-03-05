import { Injectable } from '@angular/core';
import { NotificationsService } from './notifications.service';

declare var cordova: any;

@Injectable({
  providedIn: 'root'
})
export class QrCodeService {

  constructor(private notificationsService: NotificationsService) { }

  scan() {
    return new Promise((resolve, reject) => {
      cordova.plugins.barcodeScanner.scan(data => resolve(data), err => reject(err));
    });
  }
}
