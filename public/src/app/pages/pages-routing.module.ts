import { AuthGuardService } from './../services/auth-guard.service';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ECommerceComponent } from './e-commerce/e-commerce.component';
import { NotFoundComponent } from './miscellaneous/not-found/not-found.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [{
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'iot-dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'schools',
    loadChildren: './schools/schools.module#SchoolsModule',
    canActivate: [AuthGuardService]
  },
  {
    path: 'ui-features',
    loadChildren: './ui-features/ui-features.module#UiFeaturesModule',
    canActivate: [AuthGuardService]
  },
  {
    path: 'modal-overlays',
    loadChildren: './modal-overlays/modal-overlays.module#ModalOverlaysModule',
    canActivate: [AuthGuardService]
  },
  {
    path: 'extra-components',
    loadChildren: './extra-components/extra-components.module#ExtraComponentsModule',
    canActivate: [AuthGuardService]
  },
  {
    path: 'bootstrap',
    loadChildren: './bootstrap/bootstrap.module#BootstrapModule',
    canActivate: [AuthGuardService]
  },
  {
    path: 'maps',
    loadChildren: './maps/maps.module#MapsModule',
    canActivate: [AuthGuardService]
  },
  {
    path: 'charts',
    loadChildren: './charts/charts.module#ChartsModule',
    canActivate: [AuthGuardService]
  },
  {
    path: 'editors',
    loadChildren: './editors/editors.module#EditorsModule',
    canActivate: [AuthGuardService]
  },
  {
    path: 'forms',
    loadChildren: './forms/forms.module#FormsModule',
    canActivate: [AuthGuardService]
  },
  {
    path: 'tables',
    loadChildren: './tables/tables.module#TablesModule',
    canActivate: [AuthGuardService]
  },
  {
    path: 'miscellaneous',
    loadChildren: './miscellaneous/miscellaneous.module#MiscellaneousModule',
    canActivate: [AuthGuardService]
  },
  {
    path: 'categories',
    loadChildren: './categories/categories.module#CategoriesModule',
    canActivate: [AuthGuardService]
  },
  {
    path: 'privileges',
    loadChildren: './privileges/privileges.module#PrivilegesModule',
    canActivate: [AuthGuardService]
  },
  {
    path: 'ranking',
    loadChildren: './ranking/ranking.module#RankingModule',
    canActivate: [AuthGuardService]
  },
  {
    path: 'users',
    loadChildren: './users/users.module#UsersModule',
    canActivate: [AuthGuardService]
  },
  {
    path: 'teams',
    loadChildren: './teams/teams.module#TeamsModule',
    canActivate: [AuthGuardService]
  },
  {
    path: 'referees',
    loadChildren: './referees/referees.module#RefereesModule',
    canActivate: [AuthGuardService]
  },
  {
    path: 'manifestations',
    loadChildren: './manifestations/manifestations.module#ManifestationsModule',
    canActivate: [AuthGuardService]
  },
  {
    path: 'phases',
    loadChildren: './phases/phases.module#PhasesModule',
    canActivate: [AuthGuardService]
  },
  {
    path: 'places',
    loadChildren: './places/places.module#PlacesModule',
    canActivate: [AuthGuardService]
  },
  {
    path: 'age-ranges',
    loadChildren: './age-ranges/age-ranges.module#AgeRangesModule',
    canActivate: [AuthGuardService]
  },
  {
    path: 'runs',
    loadChildren: './runs/runs.module#RunsModule',
    canActivate: [AuthGuardService]
  },
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: '**',
    component: NotFoundComponent,
  }],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
