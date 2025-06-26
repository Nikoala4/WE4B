import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-select-among-list',
  imports: [
    CommonModule
  ],
  templateUrl: './select-among-list.component.html',
  styleUrl: './select-among-list.component.css'
})
export class SelectAmongListComponent {

  @Input() selectionList: {name: string, url: string}[] = [];
  @Input() title: string = "Veuillez sélectionner un élément";
  
  @Output() select = new EventEmitter<string>();

  onSelected(value: string)
  {
    this.select.emit(value);
  }

}
