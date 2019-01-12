import { ManageUserComponent } from './manage-user/manage-user.component';
import { UsersComponent } from './users.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewUserComponent } from './new-user/new-user.component';

const routes: Routes = [{
    path: '',
    component: UsersComponent,
    children: [{
        path: 'new-user',
        component: NewUserComponent,
    },
    {
        path: 'manage-user',
        component: ManageUserComponent,
    }]
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class UsersRoutingModule { }
