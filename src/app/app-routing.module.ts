import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {RecipesComponent} from "./recipes/recipes.component";
import {ShoppingListComponent} from "./shopping-list/shopping-list.component";
import {RecipeStartComponent} from "./recipes/recipe-start/recipe-start.component";
import {RecipeDetailComponent} from "./recipes/recipe-detail/recipe-detail.component";
import {RecipeEditComponent} from "./recipes/recipe-edit/recipe-edit.component";
import {RecipeResolverService} from "./recipes/recipe-resolver.service";
import {AuthComponent} from "./auth/auth.component";
import {AuthGuard} from "./auth/auth.guard";

const appRoutes: Routes = [
  { path: '',  redirectTo: '/recipes', pathMatch: 'full'},
  { path: 'recipes',
    component: RecipesComponent,
    canActivate: [AuthGuard.authGuardFn],
    children:[
      { path: '', component: RecipeStartComponent},
      { path: 'new', component: RecipeEditComponent},
      { path: ':id',
        component: RecipeDetailComponent,
        resolve: [RecipeResolverService.fetchRecipes]},
      { path: ':id/edit',
        component: RecipeEditComponent,
        resolve: [RecipeResolverService.fetchRecipes]},
    ],
    resolve: [RecipeResolverService.fetchRecipes]},
  { path: 'shopping-list', component: ShoppingListComponent},
  { path: 'auth', component: AuthComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule{

}
