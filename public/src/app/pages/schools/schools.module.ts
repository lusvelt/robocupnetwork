import { ManageSchoolComponent } from './manage-school/manage-school.component';
import { NgModule } from '@angular/core';
import { SchoolsRoutingModule } from './schools-routing.module';
import { SchoolsComponent } from './schools.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
    imports: [
        SchoolsRoutingModule,
        SharedModule
    ],
    declarations: [
        ManageSchoolComponent,
        SchoolsComponent
    ],
    providers: [
    ]
})
export class SchoolsModule {
}
