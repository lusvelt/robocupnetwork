import { NewAgeRangeComponent } from './new-age-range/new-age-range.component';
import { AgeRangesComponent } from './age-ranges.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [{
    path: '',
    component: AgeRangesComponent,
    children: [{
        path: 'new-age-range',
        component: NewAgeRangeComponent,
    }]
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AgeRangesRoutingModule { }
