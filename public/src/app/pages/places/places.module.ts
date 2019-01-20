import { PlacesRoutingModule } from './places-routing.module';
import { ManagePlaceComponent } from './manage-place/manage-place.component';
import { PlacesComponent } from './places.component';
import { SharedModule } from './../../shared/shared.module';
import { ThemeModule } from './../../@theme/theme.module';
import { NgModule } from '@angular/core';


const components = [
    PlacesComponent,
    ManagePlaceComponent
];

@NgModule({
    imports: [
        ThemeModule,
        PlacesRoutingModule,
        SharedModule
    ],
    declarations: [
        ...components,
        ManagePlaceComponent,
    ],
})
export class PlacesModule { }
