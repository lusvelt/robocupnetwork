import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { PagesRoutingModule } from './pages-routing.module';
import { ThemeModule } from '../@theme/theme.module';
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { SmartTableService } from '../@core/data/smart-table.service';
import { ManageUserComponent } from './manage-user/manage-user.component';
import { NewCompetitionComponent } from './new-competition/new-competition.component';
import { ManageRefereeComponent } from './manage-referee/manage-referee.component';
import { ManageSchoolComponent } from './manage-school/manage-school.component';
import { ManageTeamComponent } from './manage-team/manage-team.component';
import { ManageRunComponent } from './manage-run/manage-run.component';
import { ManagePhaseComponent } from './manage-phase/manage-phase.component';
import { ManageCompetitionComponent } from './manage-competition/manage-competition.component';
import { NewUserComponent } from './new-user/new-user.component';
import { NewSchoolComponent } from './new-school/new-school.component';
import { NewTeamComponent } from './new-team/new-team.component';
import { NewRefereeComponent } from './new-referee/new-referee.component';

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
    ManageCompetitionComponent,
    ManageUserComponent,
    ManageRefereeComponent,
    NewCompetitionComponent,
    ManageSchoolComponent,
    ManageTeamComponent,
    ManageRunComponent,
    ManagePhaseComponent,
    NewUserComponent,
    NewSchoolComponent,
    NewTeamComponent,
    NewRefereeComponent,
  ],
  providers: [
  ]
})
export class PagesModule {
}
