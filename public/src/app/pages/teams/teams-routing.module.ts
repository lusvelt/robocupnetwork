import { ManageTeamComponent } from './manage-team/manage-team.component';
import { TeamsComponent } from './teams.component';
import { NotFoundComponent } from './../miscellaneous/not-found/not-found.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{
    path: '',
    component: TeamsComponent,
    children: [
        {
            path: 'manage-team',
            component: ManageTeamComponent
        }
    ],
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class TeamsRoutingModule {
}
