import { Component } from '@angular/core';
import { ApiGetClassDataResponse } from '../../../../nooble/api-comm/GetClassDataResponse';
import { Account } from '../../../../nooble/api-objs/Account';
import { ClassListComponent } from "../class-list/class-list.component";
import { ApiSearchClassRawResponse } from '../../../../nooble/api-comm/SearchClassRawResponse';

@Component({
  selector: 'app-admin-home',
  imports: [ClassListComponent],
  templateUrl: './admin-home.component.html',
  styleUrl: './admin-home.component.css'
})
export class AdminHomeComponent {

  found_classes: ApiSearchClassRawResponse[] = [];
  found_users: Account[] = []

  reloadClasses()
  {
    this.found_classes = [];
    this.searchNextClasses();
  }

  searchNextClasses()
  {

  }

  get found_classes_objects()
  {
    return this.found_classes.map(classe => ({
      id: classe.id,
      classe: {
        ...classe,
        last_modification: new Date(classe.last_modification * 1000)
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
