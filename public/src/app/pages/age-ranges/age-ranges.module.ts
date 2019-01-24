import { AgeRangesRoutingModule } from './age-ranges-routing.module';
import { NewAgeRangeComponent } from './new-age-range/new-age-range.component';
import { AgeRangesComponent } from './age-ranges.component';
import { SharedModule } from './../../shared/shared.module';
import { ThemeModule } from './../../@theme/theme.module';
import { NgModule } from '@angular/core';


const components = [
    AgeRangesComponent,
    NewAgeRangeComponent
];

@NgModule({
    imports: [
        ThemeModule,
        AgeRangesRoutingModule,
        SharedModule
    ],
    declarations: [
        ...components,
        NewAgeRangeComponent,
    ],
})
export class AgeRangesModule { }
