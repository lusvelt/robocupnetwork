import { FieldsComponent } from './fields.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManageFieldComponent } from './manage-field/manage-field.component';

const routes: Routes = [{
    path: '',
    component: FieldsComponent,
    children: [{
        path: 'manage',
        component: ManageFieldComponent,
    }],
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class FieldsRoutingModule { }
