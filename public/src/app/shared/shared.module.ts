import { QRCodesPDFService } from './../services/qr-codes-pdf.service';
import { ViewOnlyRolesModalComponent } from './modals/view-only-roles-modal/view-only-roles-modal.component';
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
import { MultipleSelectDropdownComponent } from './view-cells/multiple-select-dropdown/multiple-select-dropdown.component';
import { SingleDateComponent } from './view-cells/single-date/single-date.component';
import { RolesListComponent } from './dialogs/roles-list/roles-list.component';
import { UsersListComponent } from './dialogs/users-list/users-list.component';
import { CheckboxComponent } from './view-cells/checkbox/checkbox.component';
import { ViewOnlyCheckboxComponent } from './view-cells/view-only-checkbox/view-only-checkbox.component';
import { SingleButtonComponent } from './view-cells/single-button/single-button.component';
import { EditRunModalComponent } from './modals/edit-run-modal/edit-run-modal.component';
import { EditRolesModalComponent } from './modals/edit-roles-modal/edit-roles-modal.component';


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
        ConfirmModalComponent,
        MultipleSelectDropdownComponent,
        SingleDateComponent,
        RolesListComponent,
        UsersListComponent,
        CheckboxComponent,
        ViewOnlyCheckboxComponent,
        SingleButtonComponent,
        EditRunModalComponent,
        ViewOnlyRolesModalComponent,
        EditRolesModalComponent
    ],
    providers: [
        HttpService,
        AuthService,
        TokenService,
        NotificationsService,
        QRCodesPDFService
    ],
    entryComponents: [
        AlertModalComponent,
        ConfirmModalComponent,
        MultipleSelectDropdownComponent,
        SingleDateComponent,
        RolesListComponent,
        UsersListComponent,
        CheckboxComponent,
        ViewOnlyCheckboxComponent,
        SingleButtonComponent,
        EditRunModalComponent,
        ViewOnlyRolesModalComponent,
        EditRolesModalComponent
    ]
})
export class SharedModule { }
