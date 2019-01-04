import { SharedModule } from './../../shared/shared.module';
import { PrivilegesRoutingModule } from './privileges-routing.module';
import { ThemeModule } from './../../@theme/theme.module';
import { ActionTypesComponent } from './action-types/action-types.component';
import { NgModule } from '@angular/core';
import { PrivilegesComponent } from './privileges.component';
import { PrivilegesService } from '../../services/privileges.service';
import { ActionComponent } from './action/action.component';
import { RoleComponent } from './role/role.component';

const components = [
    PrivilegesComponent,
    ActionTypesComponent,
    ActionComponent,
    RoleComponent
];

@NgModule({
    imports: [
        ThemeModule,
        PrivilegesRoutingModule,
        SharedModule
    ],
    declarations: [
        ...components,
        ActionComponent,
        RoleComponent,
    ],
    providers: [
        PrivilegesService
    ]
})
export class PrivilegesModule { }
