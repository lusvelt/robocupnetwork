import { MobileRoutingModule } from './mobile-routing.module';
import { DashboardMobileComponent } from './dashboard-mobile/dashboard-mobile.component';
import { NgModule } from '@angular/core';

import { ThemeModule } from '../@theme/theme.module';
import { LoginMobileComponent } from './login-mobile/login-mobile.component';
import { RunSettingMobileComponent } from './run-setting-mobile/run-setting-mobile.component';
import { MobileComponent } from './mobile.component';
import { ScoringRunMobileComponent } from './scoring-run-mobile/scoring-run-mobile.component';

@NgModule({
    imports: [
        ThemeModule,
        MobileRoutingModule
    ],
    declarations: [
        MobileComponent,
        DashboardMobileComponent,
        LoginMobileComponent,
        RunSettingMobileComponent,
        ScoringRunMobileComponent
    ],
})
export class MobileModule {
}
