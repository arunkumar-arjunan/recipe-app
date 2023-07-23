import { Component } from '@angular/core';
import {ingredient} from "../shared/ingredient.model";

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent {

  ingredients: ingredient[] = [
    new ingredient('Apple', 5),
    new ingredient('Tomato', 10)
  ];

}
