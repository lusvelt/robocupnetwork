import { ManageRankingComponent } from './manage-ranking/manage-ranking.component';
import { NgModule } from '@angular/core';
import { RankingRoutingModule } from './ranking-routing.module';
import { RankingComponent } from './ranking.component';
import { SharedModule } from '../../shared/shared.module';
import { ThemeModule } from '../../@theme/theme.module';

@NgModule({
    imports: [
        ThemeModule,
        RankingRoutingModule,
        SharedModule
    ],
    declarations: [
        ManageRankingComponent,
        RankingComponent
    ],
    providers: [
    ]
})
export class RankingModule {
}
