import { ActionTypesComponent } from './action-types/action-types.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PrivilegesComponent } from './privileges.component';

const routes: Routes = [{
    path: '',
    component: PrivilegesComponent,
    children: [{
        path: 'action-types',
        component: ActionTypesComponent,
    }],
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class PrivilegesRoutingModule { }
