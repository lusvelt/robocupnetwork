import { ChangePasswordComponent } from './change-password/change-password.component';
import { SettingsComponent } from './settings.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [{
    path: '',
  component: SettingsComponent,
    children: [{
        path: 'change-password',
        component: ChangePasswordComponent,
    }]
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class SettingsRoutingModule { }
