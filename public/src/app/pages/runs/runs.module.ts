import { SharedModule } from './../../shared/shared.module';
import { ThemeModule } from './../../@theme/theme.module';
import { NgModule } from '@angular/core';
import { ManageRunComponent } from './manage-run/manage-run.component';
import { RunsRoutingModule } from './runs-routing.module';
import { RunsComponent } from './runs.component';

const components = [
    RunsComponent,
    ManageRunComponent
];

@NgModule({
    imports: [
        ThemeModule,
        RunsRoutingModule,
        SharedModule
    ],
    declarations: [
        ...components,
        ManageRunComponent
    ],
})
export class RunsModule { }
