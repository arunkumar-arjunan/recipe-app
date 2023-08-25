import {Recipe} from "./recipe.model";
import {Injectable} from "@angular/core";
import {Ingredient} from "../shared/ingredient.model";
import {ShoppingListService} from "../shopping-list/shopping-list.service";

//This is a service class where we can keep business logics in the service layer
//we want to avoid above and provide this at root level you can use this
//@Injectable({
//   providedIn: 'root'
// })
@Injectable()
export class RecipeService {

  constructor(private shoppingListService: ShoppingListService) { }

  private _recipes: Recipe[] =  [
    new Recipe('Palak Paneer', 'Good for health',
      'https://images.unsplash.com/photo-1589647363585-f4a7d3877b10?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1172&q=80',
      [
        new Ingredient('Spinach', 1),
        new Ingredient('Paneer', 5)
      ]),
    new Recipe('Veg Biriyani', 'Best Alternative for Mutton Biriyani',
      'https://yellowchilis.com/wp-content/uploads/2020/09/veg-biryani-onepot-meal-unchanged-2.jpg', [
        new Ingredient('Vegetables', 10),
        new Ingredient('Rice', 15)
      ])
  ];

  getRecipes(): Recipe[] {
    return this._recipes.slice();
  }

  getRecipe(index: number){
    return this._recipes.slice()[index];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]){
    this.shoppingListService.addIngredients(ingredients);
  }

}
