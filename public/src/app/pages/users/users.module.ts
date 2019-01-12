import { UsersRoutingModule } from './users-routing.module';
import { ManageUserComponent } from './manage-user/manage-user.component';
import { UsersComponent } from './users.component';
import { SharedModule } from './../../shared/shared.module';
import { ThemeModule } from './../../@theme/theme.module';
import { NgModule } from '@angular/core';
import { NewUserComponent } from './new-user/new-user.component';

const components = [
    UsersComponent,
    NewUserComponent,
    ManageUserComponent
];

@NgModule({
    imports: [
        ThemeModule,
        UsersRoutingModule,
        SharedModule
    ],
    declarations: [
        ...components,
        NewUserComponent,
        ManageUserComponent,
    ],
})
export class UsersModule { }
