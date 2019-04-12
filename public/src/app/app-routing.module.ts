import { AuthGuardService } from './services/auth-guard.service';
import { LogoutComponent } from './@theme/components/auth/logout/logout.component';
import { RequestPasswordComponent } from './@theme/components/auth/request-password/request-password.component';
import { ResetPasswordComponent } from './@theme/components/auth/reset-password/reset-password.component';
import { LoginComponent } from './@theme/components/auth/login/login.component';
import { RegisterComponent } from './@theme/components/auth/register/register.component';

import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { NbAuthComponent } from '@nebular/auth';
import { environment } from '../environments/environment';
import { MainPageComponent } from './main-page/main-page.component';
import { RankComponent } from './rank/rank.component';
import { PublicRankingComponent } from './public-ranking/public-ranking.component';

const routes: Routes = [
  { path : 'main-page', component: MainPageComponent},
  { path: 'pages', loadChildren: 'app/pages/pages.module#PagesModule', canActivate: [AuthGuardService] },
  { path: 'mobile', loadChildren: 'app/mobile/mobile.module#MobileModule'/*, canActivate: [AuthGuardService] */},
  { path: 'rank', component: RankComponent },
  { path: 'public-ranking', component: PublicRankingComponent },
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
  { path: '', redirectTo: environment.mobile ? 'mobile' : 'main-page', pathMatch: 'full' }
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
