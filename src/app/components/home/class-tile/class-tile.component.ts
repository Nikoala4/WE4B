import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ApiGetClassDataResponse } from '../../../../nooble/api-comm/GetClassDataResponse';

@Component({
  selector: 'app-class-tile',
  imports: [RouterLink],
  templateUrl: './class-tile.component.html',
  styleUrl: './class-tile.component.css'
})
export class ClassTileComponent {
  @Input() classe!: ApiGetClassDataResponse
  @Input() classId!: string

  constructor(){}

  ngOnInit()
  {
    console.log(this.classe, this.classId);
  }
}
