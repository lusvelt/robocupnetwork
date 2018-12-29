import { SharedModule } from './../../shared/shared.module';
import { PrivilegesRoutingModule } from './privileges-routing.module';
import { ThemeModule } from './../../@theme/theme.module';
import { ActionTypesComponent } from './action-types/action-types.component';
import { NgModule } from '@angular/core';
import { PrivilegesComponent } from './privileges.component';
import { PrivilegesService } from '../../services/privileges.service';

const components = [
    PrivilegesComponent,
    ActionTypesComponent
];

@NgModule({
    imports: [
        ThemeModule,
        PrivilegesRoutingModule,
        SharedModule
    ],
    declarations: [
        ...components,
    ],
    providers: [
        PrivilegesService
    ]
})
export class PrivilegesModule { }
