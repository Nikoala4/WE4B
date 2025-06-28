import { Component, OnInit } from '@angular/core';
import { ApiGetClassDataResponse } from '../../../../nooble/api-comm/GetClassDataResponse';
import { Account } from '../../../../nooble/api-objs/Account';
import { ClassListComponent } from "../class-list/class-list.component";
import { ApiSearchClassRawResponse } from '../../../../nooble/api-comm/SearchClassRawResponse';
import { ProfileListComponent } from '../profile-list/profile-list.component';
import { ApiService } from '../../../services/api.service';
import { Class } from '../../../../nooble/api-objs/Class';

@Component({
  selector: 'app-admin-home',
  imports: [ClassListComponent, ProfileListComponent],
  templateUrl: './admin-home.component.html',
  styleUrl: './admin-home.component.css'
})
export class AdminHomeComponent implements OnInit{

  found_classes: Class[] = [];
  classe_search = ""
  found_users: Account[] = []

  constructor(private api: ApiService){}

  ngOnInit(){
    this.searchNextClasses();
  }

  reloadClasses(pattern: string)
  {
    this.found_classes = [];
    this.classe_search = pattern
    this.searchNextClasses();
  }

  searchNextClasses()
  {
    this.api.classes.searchClass(this.classe_search, 5, this.found_classes.length).subscribe(classes => {
      for (let classe of classes){
        this.found_classes.push(classe)
      }
    })
  }

  get found_classes_objects()
  {
    return this.found_classes.map(classe => ({
      id: classe.id,
      classe: {
        description: classe.description,
        last_modification: classe.last_modification,
        last_modifier: classe.last_modifier,
        name: classe.name
      }
    }))
  }

  reloadUsers()
  {
    this.found_users = [];
    this.searchNextUsers();
  }

  searchNextUsers()
  {

  }

}
