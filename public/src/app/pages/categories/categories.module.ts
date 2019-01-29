import { CategoriesRoutingModule } from './categories-routing.module';
import { NewCategoryComponent } from './new-category/new-category.component';
import { CategoriesComponent } from './categories.component';
import { SharedModule } from './../../shared/shared.module';
import { ThemeModule } from './../../@theme/theme.module';
import { NgModule } from '@angular/core';


const components = [
    CategoriesComponent,
    NewCategoryComponent
];

@NgModule({
    imports: [
        ThemeModule,
        CategoriesRoutingModule,
        SharedModule
    ],
    declarations: [
        ...components,
        NewCategoryComponent,
    ],
})
export class CategoriesModule { }
