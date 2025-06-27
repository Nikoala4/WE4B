import { Component, Input } from '@angular/core';
import { Class } from '../../../../nooble/api-objs/Class';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-class-tile',
  imports: [RouterLink],
  templateUrl: './class-tile.component.html',
  styleUrl: './class-tile.component.css'
})
export class ClassTileComponent {
  @Input() classe!: Class

  constructor(){}
}
