import { ManifestationsComponent } from './manifestations.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewManifestationComponent } from './new-manifestation/new-manifestation.component';

const routes: Routes = [{
    path: '',
    component: ManifestationsComponent,
    children: [{
        path: 'new-manifestation',
        component: NewManifestationComponent,
    }],
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ManifestationsRoutingModule { }
