import { ManagePlaceComponent } from './manage-place/manage-place.component';
import { PlacesComponent } from './places.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [{
    path: '',
    component: PlacesComponent,
    children: [{
        path: 'manage-place',
        component: ManagePlaceComponent,
    }]
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class PlacesRoutingModule { }
