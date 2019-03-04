import { DashboardMobileComponent } from './dashboard-mobile/dashboard-mobile.component';
import { LoginMobileComponent } from './login-mobile/login-mobile.component';
import { MobileComponent } from './mobile.component';
import { NotFoundComponent } from './../pages/miscellaneous/not-found/not-found.component';
import { AuthGuardService } from './../services/auth-guard.service';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { RunSettingMobileComponent } from './run-setting-mobile/run-setting-mobile.component';

const routes: Routes = [{
    path: '',
    component: MobileComponent,
    children: [
        {
            path: 'login',
            component: LoginMobileComponent
        },
        {
            path: 'dashboard',
            component: DashboardMobileComponent
        },
        {
            path: 'run-setting',
            component: RunSettingMobileComponent
        },
        {
            path: '',
            redirectTo: 'login',
            pathMatch: 'full'
        }
    ],
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class MobileRoutingModule {
}