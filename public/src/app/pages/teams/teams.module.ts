import { ManageTeamComponent } from './manage-team/manage-team.component';
import { NgModule } from '@angular/core';
import { TeamsRoutingModule } from './teams-routing.module';
import { TeamsComponent } from './teams.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
    imports: [
        TeamsRoutingModule,
        SharedModule
    ],
    declarations: [
        ManageTeamComponent,
        TeamsComponent
    ],
    providers: [
    ]
})
export class TeamsModule {
}
