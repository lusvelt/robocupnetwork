import { ManageRefereesComponent } from './manage-referees/manage-referees.component';
import { NgModule } from '@angular/core';
import { RefereesRoutingModule } from './referees-routing.module';
import { RefereesComponent } from './referees.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    RefereesRoutingModule,
    SharedModule
  ],
  declarations: [
    ManageRefereesComponent,
    RefereesComponent
  ],
  providers: [
  ]
})
export class RefereesModule {
}
