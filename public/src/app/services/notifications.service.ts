import { Injectable } from '@angular/core';
import { ToasterService, ToasterConfig, Toast } from 'angular2-toaster';
import { notificationsConfig } from '../config/notifications.config';
import { TranslateService } from '../../../node_modules/@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  config: ToasterConfig = new ToasterConfig(notificationsConfig);

  constructor(private toasterService: ToasterService, private translate: TranslateService) { }

  success(message: string = '') {
    const toast: Toast = {
      type: 'success',
      title: 'NOTIFICATION_SUCCESS_TITLE',
      body: message
    };

    this.showToast(toast);
  }

  warning(message: string = '') {
    const toast: Toast = {
      type: 'warning',
      title: 'NOTIFICATION_WARNING_TITLE',
      body: message
    };

    this.showToast(toast);
  }

  error(message: string = '') {
    const toast: Toast = {
      type: 'error',
      title: 'NOTIFICATION_ERROR_TITLE',
      body: message
    };

    this.showToast(toast);
  }

  showToast(toast: Toast): void {
    const translateTitle = this.translate.get(toast.title).toPromise();
    const translateBody = this.translate.get(toast.body).toPromise();

    Promise.all([translateTitle, translateBody])
      .then(translations => {
        toast.title = translations[0];
        toast.body = translations[1];
        this.toasterService.popAsync(toast);
      });
  }
}
