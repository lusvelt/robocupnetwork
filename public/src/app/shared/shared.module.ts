import { ToasterModule } from 'angular2-toaster';
import { NotificationsService } from './../services/notifications.service';
import { TokenService } from './../services/token.service';
import { AuthService } from './../services/auth.service';
import { HttpService } from './../services/http.service';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
    imports: [
        TranslateModule
    ],
    exports: [
        TranslateModule
    ],
    providers: [
        HttpService,
        AuthService,
        TokenService,
        NotificationsService
    ]
})
export class SharedModule { }
