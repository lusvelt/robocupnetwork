import { ActionTypesComponent } from './action-types/action-types.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PrivilegesComponent } from './privileges.component';
import { ActionsComponent } from './actions/actions.component';
import { RolesComponent } from './roles/roles.component';

const routes: Routes = [{
    path: '',
    component: PrivilegesComponent,
    children: [{
        path: 'action-types',
        component: ActionTypesComponent,
    },
    {
        path: 'action',
        component: ActionsComponent,
    },
    {
        path: 'role',
        component: RolesComponent,
    }],
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class PrivilegesRoutingModule { }
