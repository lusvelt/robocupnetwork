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
  },
  {
    path: 'iot-dashboard',
    component: DashboardComponent,
  },
  {
    path: 'schools',
    loadChildren: './schools/schools.module#SchoolsModule',
  },
  {
    path: 'ui-features',
    loadChildren: './ui-features/ui-features.module#UiFeaturesModule',
  },
  {
    path: 'modal-overlays',
    loadChildren: './modal-overlays/modal-overlays.module#ModalOverlaysModule',
  },
  {
    path: 'extra-components',
    loadChildren: './extra-components/extra-components.module#ExtraComponentsModule',
  },
  {
    path: 'bootstrap',
    loadChildren: './bootstrap/bootstrap.module#BootstrapModule',
  },
  {
    path: 'maps',
    loadChildren: './maps/maps.module#MapsModule',
  },
  {
    path: 'charts',
    loadChildren: './charts/charts.module#ChartsModule',
  },
  {
    path: 'editors',
    loadChildren: './editors/editors.module#EditorsModule',
  },
  {
    path: 'forms',
    loadChildren: './forms/forms.module#FormsModule',
  },
  {
    path: 'tables',
    loadChildren: './tables/tables.module#TablesModule',
  },
  {
    path: 'miscellaneous',
    loadChildren: './miscellaneous/miscellaneous.module#MiscellaneousModule',
  },
  {
    path: 'categories',
    loadChildren: './categories/categories.module#CategoriesModule',
  },
  {
    path: 'privileges',
    loadChildren: './privileges/privileges.module#PrivilegesModule',
  },
  {
    path: 'users',
    loadChildren: './users/users.module#UsersModule',
  },
  {
    path: 'teams',
    loadChildren: './teams/teams.module#TeamsModule',
  },
  {
    path: 'referees',
    loadChildren: './referees/referees.module#RefereesModule',
  },
  {
    path: 'manifestations',
    loadChildren: './manifestations/manifestations.module#ManifestationsModule',
  },
  {
    path: 'places',
    loadChildren: './places/places.module#PlacesModule',
  },
  {
    path: 'age-ranges',
    loadChildren: './age-ranges/age-ranges.module#AgeRangesModule',
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
