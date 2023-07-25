import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Recipe} from "../../recipe.model";
import {RecipeService} from "../../recipe.service";

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent {

  //Input is used to make other components to assign value to this variable using [] property binding
  //In this case we pass value to this recipe in recipe list [recipe]="recipeEl"
  @Input() recipe: Recipe;

  //injecting recipe service
  constructor(private recipeService: RecipeService) {
  }

  onSelected() {
    this.recipeService.recipeSelected.emit(this.recipe);
  }
}
