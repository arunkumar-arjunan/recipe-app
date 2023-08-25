import {Component} from '@angular/core';
import {RecipeService} from "./recipe.service";

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
  providers: [RecipeService] //we need to provide the service class here to make it available in this package
})
export class RecipesComponent {

}
