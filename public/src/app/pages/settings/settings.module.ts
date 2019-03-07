import { SettingsRoutingModule } from './settings-routing.module';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { SettingsComponent } from './settings.component';
import { SharedModule } from './../../shared/shared.module';
import { ThemeModule } from './../../@theme/theme.module';
import { NgModule } from '@angular/core';


const components = [
    SettingsComponent,
    ChangePasswordComponent
];

@NgModule({
    imports: [
        ThemeModule,
        SettingsRoutingModule,
        SharedModule
    ],
    declarations: [
        ...components,
    ],
})
export class SettingsModule { }
