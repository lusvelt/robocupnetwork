import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { PagesRoutingModule } from './pages-routing.module';
import { ThemeModule } from '../@theme/theme.module';
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { SmartTableService } from '../@core/data/smart-table.service';
import { ManifestationListComponent } from './manifestation-list/manifestation-list.component';
import { ManageUserComponent } from './manage-user/manage-user.component';
import { ListUserComponent } from './list-user/list-user.component';
import { NewCompetitionComponent } from './new-competition/new-competition.component';

const PAGES_COMPONENTS = [
  PagesComponent,
];

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    MiscellaneousModule,
    Ng2SmartTableModule
  ],
  declarations: [
    ...PAGES_COMPONENTS,
    DashboardComponent,
    ManifestationListComponent,
    ManageUserComponent,
    ListUserComponent,
    NewCompetitionComponent,
  ],
  providers: [
  ]
})
export class PagesModule {
}
