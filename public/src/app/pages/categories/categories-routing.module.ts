import { NewCategoryComponent } from './new-category/new-category.component';
import { CategoriesComponent } from './categories.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [{
    path: '',
    component: CategoriesComponent,
    children: [{
        path: 'new-category',
        component: NewCategoryComponent,
    }]
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class CategoriesRoutingModule { }
