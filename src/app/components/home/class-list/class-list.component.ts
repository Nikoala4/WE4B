import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Role } from '../../../../nooble/api-objs/Role';
import { CookiesService } from '../../../services/cookies.service';
import { NgFor, NgIf } from '@angular/common';
import { ApiService } from '../../../services/api.service';
import { ClassTileComponent } from "../class-tile/class-tile.component";
import { Class } from '../../../../nooble/api-objs/Class';
import { SearchBarComponent } from "../../../components/searchbar/searchbar.component";
import { ApiGetClassDataResponse } from '../../../../nooble/api-comm/GetClassDataResponse';

@Component({
  selector: 'app-class-list',
  imports: [
    ClassTileComponent,
    NgFor,
    SearchBarComponent
  ],
  templateUrl: './class-list.component.html',
  styleUrl: './class-list.component.css'
})
export class ClassListComponent implements OnInit {

  @Input() classesIds: string[] = [];
  classes: {id: string, classe: ApiGetClassDataResponse}[] = [];

  constructor(
    private api: ApiService
  ) {}

  ngOnInit() {
    for (let classeId of this.classesIds){
      let currentClassId = classeId;

      this.api.classes.getData(currentClassId).subscribe(classe => {
        this.classes.push({
          id: currentClassId,
          classe: {
            description: classe.description,
            last_modification: classe.last_modification,
            last_modifier: classe.last_modifier,
            name: classe.name
          }
        })
      })

    };

  }
}
