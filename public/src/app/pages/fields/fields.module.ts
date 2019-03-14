import { ManageFieldComponent } from './manage-field/manage-field.component';
import { SharedModule } from '../../shared/shared.module';
import { FieldsRoutingModule } from './fields-routing.module';
import { ThemeModule } from '../../@theme/theme.module';
import { NgModule } from '@angular/core';
import { FieldsComponent } from './fields.component';

const components = [
    FieldsComponent,
    ManageFieldComponent
];

@NgModule({
    imports: [
        ThemeModule,
        FieldsRoutingModule,
        SharedModule
    ],
    declarations: [
        ...components,
        ManageFieldComponent,
    ]
})
export class FieldsModule { }
