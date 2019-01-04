import { ActionTypesComponent } from './action-types/action-types.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PrivilegesComponent } from './privileges.component';
import { ActionComponent } from './action/action.component';
import { RoleComponent } from './role/role.component';

const routes: Routes = [{
    path: '',
    component: PrivilegesComponent,
    children: [{
        path: 'action-types',
        component: ActionTypesComponent,
    },
    {
        path: 'action',
        component: ActionComponent,
    },
    {
        path: 'role',
        component: RoleComponent,
    }],
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class PrivilegesRoutingModule { }
