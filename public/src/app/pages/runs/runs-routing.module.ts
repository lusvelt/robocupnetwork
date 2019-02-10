import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RunsComponent } from './runs.component';
import { ManageRunComponent } from './manage-run/manage-run.component';

const routes: Routes = [{
    path: '',
    component: RunsComponent,
    children: [
    {
        path: 'manage-run',
        component: ManageRunComponent,
    }]
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class RunsRoutingModule { }
