import { PhasesRoutingModule } from './phases-routing.module';
import { ManagePhaseComponent } from './manage-phase/manage-phase.component';
import { PhasesComponent } from './phases.component';
import { SharedModule } from './../../shared/shared.module';
import { ThemeModule } from './../../@theme/theme.module';
import { NgModule } from '@angular/core';


const components = [
    PhasesComponent,
    ManagePhaseComponent
];

@NgModule({
    imports: [
        ThemeModule,
        PhasesRoutingModule,
        SharedModule
    ],
    declarations: [
        ...components
    ],
})
export class PhasesModule { }
