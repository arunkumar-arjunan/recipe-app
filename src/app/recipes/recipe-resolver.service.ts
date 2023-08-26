import { Injectable, inject } from "@angular/core";
import { DataStorageService } from "../shared/data-storage.service";
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from "@angular/router";
import { Recipe } from "./recipe.model";
import { RecipeService } from "./recipe.service";

@Injectable({ providedIn: "root" })
export class RecipeResolverService {

  constructor(private recipeService: RecipeService, private dataStorageService: DataStorageService) {}

  static fetchRecipes: ResolveFn<Recipe[]> = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    const recipeService = inject(RecipeService);
    const dataStorageService = inject(DataStorageService);

    const recipes = recipeService.getRecipes();
    if (recipes.length === 0) {
      return dataStorageService.fetchRecipes();
    } else {
      return recipes;
    }
  }
}
