import { ManageStaffComponent } from './manage-staff/manage-staff.component';
import { StaffComponent } from './staff.component';
import { NotFoundComponent } from './../miscellaneous/not-found/not-found.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{
    path: '',
    component: StaffComponent,
    children: [
        {
            path: 'manage',
            component: ManageStaffComponent
        }
    ],
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class StaffRoutingModule {
}
