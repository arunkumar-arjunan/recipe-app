import {Component, EventEmitter, Output} from '@angular/core';
import {Recipe} from "../recipe.model";

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent {

  @Output() recipeWasSelected = new EventEmitter<Recipe>();
  recipes: Recipe[] =  [
    new Recipe('Palak Paneer', 'Good for health', 'https://images.unsplash.com/photo-1589647363585-f4a7d3877b10?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1172&q=80'),
    new Recipe('Veg Biriyani', 'Best Alternative for Mutton Biriyani', 'https://yellowchilis.com/wp-content/uploads/2020/09/veg-biryani-onepot-meal-unchanged-2.jpg')
  ];

  onRecipeSelect(recipe: Recipe) {
    this.recipeWasSelected.emit(recipe);
  }
}
