import { NewManifestationComponent } from './new-manifestation/new-manifestation.component';
import { SharedModule } from '../../shared/shared.module';
import { ManifestationsRoutingModule } from './manifestations-routing.module';
import { ThemeModule } from '../../@theme/theme.module';
import { NgModule } from '@angular/core';
import { ManifestationsComponent } from './manifestations.component';

const components = [
    ManifestationsComponent,
    NewManifestationComponent
];

@NgModule({
    imports: [
        ThemeModule,
        ManifestationsRoutingModule,
        SharedModule
    ],
    declarations: [
        ...components,
        NewManifestationComponent,
    ]
})
export class ManifestationsModule { }
