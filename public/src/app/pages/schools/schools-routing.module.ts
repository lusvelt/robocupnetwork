import { ManageSchoolComponent } from './manage-school/manage-school.component';
import { SchoolsComponent } from './schools.component';
import { NotFoundComponent } from './../miscellaneous/not-found/not-found.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{
    path: '',
    component: SchoolsComponent,
    children: [
        {
            path: 'manage',
            component: ManageSchoolComponent
        }
    ],
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class SchoolsRoutingModule {
}
