import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { ECommerceModule } from './e-commerce/e-commerce.module';
import { PagesRoutingModule } from './pages-routing.module';
import { ThemeModule } from '../@theme/theme.module';
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';
import { NewManifestationComponent } from './manifestations/new-manifestation/new-manifestation.component';
import { ManagePlaceComponent } from './places/manage-place/manage-place.component';
import { NewAgeRangeComponent } from './age-ranges/new-age-range/new-age-range.component';
import { ManageTeamComponent } from './teams/manage-team/manage-team.component';

const PAGES_COMPONENTS = [
  PagesComponent,
];

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    DashboardModule,
    ECommerceModule,
    MiscellaneousModule,
  ],
  declarations: [
    ...PAGES_COMPONENTS,
    ManageTeamComponent,
  ],
})
export class PagesModule {
}
