import { ConfirmModalComponent } from './modals/confirm-modal/confirm-modal.component';
import { AlertModalComponent } from './modals/alert-modal/alert-modal.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ThemeModule } from './../@theme/theme.module';
import { NotificationsService } from './../services/notifications.service';
import { TokenService } from './../services/token.service';
import { AuthService } from './../services/auth.service';
import { HttpService } from './../services/http.service';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
    imports: [
        TranslateModule,
        ThemeModule,
        Ng2SmartTableModule
    ],
    exports: [
        TranslateModule,
        ThemeModule,
        Ng2SmartTableModule
    ],
    declarations: [
        AlertModalComponent,
        ConfirmModalComponent
    ],
    providers: [
        HttpService,
        AuthService,
        TokenService,
        NotificationsService
    ],
    entryComponents: [
        AlertModalComponent,
        ConfirmModalComponent
    ]
})
export class SharedModule { }
