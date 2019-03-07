import { ManageRankingComponent } from './manage-ranking/manage-ranking.component';
import { RankingComponent } from './ranking.component';
import { NotFoundComponent } from './../miscellaneous/not-found/not-found.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{
    path: '',
    component: RankingComponent,
    children: [
        {
            path: 'manage',
            component: ManageRankingComponent
        }
    ],
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class RankingRoutingModule {
}
