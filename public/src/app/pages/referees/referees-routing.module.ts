import { ManageRefereesComponent } from './manage-referees/manage-referees.component';
import { RefereesComponent } from './referees.component';
import { NotFoundComponent } from './../miscellaneous/not-found/not-found.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{
  path: '',
  component: RefereesComponent,
  children: [
    {
      path: 'manage-referees',
      component: ManageRefereesComponent
    }
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RefereesRoutingModule {
}
