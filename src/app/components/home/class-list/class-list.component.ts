import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Role } from '../../../../nooble/api-objs/Role';
import { CookiesService } from '../../../services/cookies.service';
import { NgFor, NgIf } from '@angular/common';
import { ApiService } from '../../../services/api.service';
import { ClassTileComponent } from "../class-tile/class-tile.component";
import { Class } from '../../../../nooble/api-objs/Class';
import { SearchBarComponent } from "../../../components/searchbar/searchbar.component";

@Component({
  selector: 'app-class-list',
  imports: [NgIf, ClassTileComponent, NgFor, SearchBarComponent],
  templateUrl: './class-list.component.html',
  styleUrl: './class-list.component.css'
})
export class ClassListComponent implements OnInit {

  public classes: Class[] = [];
  public adminView = false;

  constructor(private account: AuthService,
    private cookies: CookiesService,
    private api: ApiService
  ) { }

  ngOnInit() {
    switch (this.account.currentUser?.role) {
      case (Role.STUDENT || Role.TEACHER || (Role.TEACHER_ADMIN && !this.cookies.adminEnabled)):  
        for (let classeId of this.account.currentUser.profile.classes){
          this.api.classes.getData(classeId).subscribe(classe => {
            this.classes.push({
              id: classeId, 
              content: {type: "container", data: {is_horizontal: false, is_wrapping: false, children: []}},
              description: classe.description,
              last_modification: classe.last_modification,
              last_modifier: classe.last_modifier,
              name: classe.name})
          })
        };
        break;
      case (Role.ADMIN || (Role.TEACHER_ADMIN && this.cookies.adminEnabled)):
        this.adminView = true;
        break;
    }

    if (this.adminView) {
      this.api.classes.searchClass('', 10,0).subscribe(classes => {
        this.classes = classes
      })
    }
  }
}
