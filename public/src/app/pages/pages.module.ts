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
import { NewCompetitionComponent } from './new-competition/new-competition.component';
import { ManageRefereeComponent } from './manage-referee/manage-referee.component';
import { ManageSchoolComponent } from './manage-school/manage-school.component';
import { ManageTeamComponent } from './manage-team/manage-team.component';
import { ManageRunComponent } from './manage-run/manage-run.component';
import { ManagePhaseComponent } from './manage-phase/manage-phase.component';

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
    ManageRefereeComponent,
    NewCompetitionComponent,
    ManageSchoolComponent,
    ManageTeamComponent,
    ManageRunComponent,
    ManagePhaseComponent,
  ],
  providers: [
  ]
})
export class PagesModule {
}
