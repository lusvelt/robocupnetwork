import { ManageStaffComponent } from './manage-staff/manage-staff.component';
import { NgModule } from '@angular/core';
import { StaffRoutingModule } from './staff-routing.module';
import { StaffComponent } from './staff.component';
import { SharedModule } from '../../shared/shared.module';
import { ThemeModule } from '../../@theme/theme.module';

@NgModule({
    imports: [
        ThemeModule,
        StaffRoutingModule,
        SharedModule
    ],
    declarations: [
        ManageStaffComponent,
        StaffComponent
    ],
    providers: [
    ]
})
export class StaffModule {
}
