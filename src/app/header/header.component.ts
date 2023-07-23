import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  //EventEmitter helps us to emit a event with some values in it, we can read this in other components and take actions against it
  //In this case we emit the selected feature in the header
  @Output() featureSelected = new EventEmitter<string>();
  onSelect(feature: string) {
    this.featureSelected.emit(feature);
  }
}
