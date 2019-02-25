import { RunSettingComponent } from './@theme/components/mobileapp/runsetting/runsetting.component';
import { AuthGuardService } from './services/auth-guard.service';
import { LogoutComponent } from './@theme/components/auth/logout/logout.component';
import { RequestPasswordComponent } from './@theme/components/auth/request-password/request-password.component';
import { ResetPasswordComponent } from './@theme/components/auth/reset-password/reset-password.component';
import { LoginComponent } from './@theme/components/auth/login/login.component';
import { RegisterComponent } from './@theme/components/auth/register/register.component';

import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { NbAuthComponent } from '@nebular/auth';
import { MobileloginComponent } from './@theme/components/mobileapp/mobilelogin/mobilelogin.component';
import { MobiledashboardComponent } from './@theme/components/mobileapp/mobiledashboard/mobiledashboard.component';
import { MobileappComponent } from './@theme/components/mobileapp/mobileapp.component';

const routes: Routes = [
  { path: 'pages', loadChildren: 'app/pages/pages.module#PagesModule', canActivate: [AuthGuardService] },
  {
    path: 'auth',
    component: NbAuthComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'register',
        component: RegisterComponent,
      },
      {
        path: 'reset-password',
        component: ResetPasswordComponent,
      },
      {
        path: 'request-password',
        component: RequestPasswordComponent,
      },
      {
        path: 'logout',
        component: LogoutComponent,
      },
      { path: '', redirectTo: 'login', pathMatch: 'full' }
    ],
  },
  {
    path: 'mobileapp',
    component: MobileappComponent,
    children: [
      {
        path: 'mobilelogin',
        component: MobileloginComponent
      },
      {
        path: 'mobiledashboard',
        component: MobiledashboardComponent
      },
      {
        path: 'runsetting',
        component: RunSettingComponent
      },
      {
        path: '',
        redirectTo: 'mobilelogin',
        pathMatch: 'full'
      }
    ]
  },
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
  { path: '**', redirectTo: 'pages' },
];

const config: ExtraOptions = {
  useHash: true,
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
