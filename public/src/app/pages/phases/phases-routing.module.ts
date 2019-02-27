import { ManagePhaseComponent } from './manage-phase/manage-phase.component';
import { PhasesComponent } from './phases.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [{
    path: '',
    component: PhasesComponent,
    children: [{
        path: 'manage-phase',
        component: ManagePhaseComponent,
    }]
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class PhasesRoutingModule { }
