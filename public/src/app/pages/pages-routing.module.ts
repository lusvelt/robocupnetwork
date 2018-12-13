import { ManageTeamComponent } from './manage-team/manage-team.component';
import { ManageRefereeComponent } from './manage-referee/manage-referee.component';
import { NewCompetitionComponent } from './new-competition/new-competition.component';
import { ManifestationListComponent } from './manifestation-list/manifestation-list.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NotFoundComponent } from './miscellaneous/not-found/not-found.component';
import { ManageUserComponent } from './manage-user/manage-user.component';
import { ManageSchoolComponent } from './manage-school/manage-school.component';
import { ManageRunComponent } from './manage-run/manage-run.component';
import { ManagePhaseComponent } from './manage-phase/manage-phase.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [{
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: 'manifestation-list',
    component: ManifestationListComponent,
  },
  {
    path: 'manage-user',
    component: ManageUserComponent,
  },
  {
    path: 'manage-team',
    component: ManageTeamComponent,
  },
  {
    path: 'manage-school',
    component: ManageSchoolComponent,
  },
  {
    path: 'manage-run',
    component: ManageRunComponent,
  },
  {
    path: 'manage-phase',
    component: ManagePhaseComponent,
  },
  {
    path: 'manage-referee',
    component: ManageRefereeComponent,
  },
  {
    path: 'new-competition',
    component: NewCompetitionComponent,
  },
  {
    path: 'ui-features',
    loadChildren: './ui-features/ui-features.module#UiFeaturesModule',
  }, {
    path: 'components',
    loadChildren: './components/components.module#ComponentsModule',
  }, {
    path: 'maps',
    loadChildren: './maps/maps.module#MapsModule',
  }, {
    path: 'charts',
    loadChildren: './charts/charts.module#ChartsModule',
  }, {
    path: 'editors',
    loadChildren: './editors/editors.module#EditorsModule',
  }, {
    path: 'forms',
    loadChildren: './forms/forms.module#FormsModule',
  }, {
    path: 'tables',
    loadChildren: './tables/tables.module#TablesModule',
  }, {
    path: 'miscellaneous',
    loadChildren: './miscellaneous/miscellaneous.module#MiscellaneousModule',
  }, {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  }, {
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
