import {EventEmitter, Injectable} from '@angular/core';
import {Ingredient} from "../shared/ingredient.model";

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {

  ingredientsChanged = new EventEmitter<Ingredient[]>;

  constructor() { }

  private _ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10),
  ];

  getIngredients() {
    return this._ingredients.slice();
  }

  addIngredient(ingredient: Ingredient){
    this._ingredients.push(ingredient);
    //since get method returns only copy of ingredients, we are emitting the new ingredients list when we change
    this.ingredientsChanged.emit(this._ingredients.slice());
  }

  addIngredients(ingredients: Ingredient[]){
    this._ingredients.push(...ingredients);
    this.ingredientsChanged.emit(this._ingredients.slice());
  }

}
