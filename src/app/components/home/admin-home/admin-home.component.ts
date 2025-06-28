import { Component, OnInit } from '@angular/core';
import { ApiGetClassDataResponse } from '../../../../nooble/api-comm/GetClassDataResponse';
import { Account } from '../../../../nooble/api-objs/Account';
import { ClassListComponent } from "../class-list/class-list.component";
import { ApiSearchClassRawResponse } from '../../../../nooble/api-comm/SearchClassRawResponse';
import { ApiService } from '../../../services/api.service';
import { Class } from '../../../../nooble/api-objs/Class';
import { UsersListComponent } from "../users-list/users-list.component";

@Component({
  selector: 'app-admin-home',
  imports: [
    ClassListComponent,
    UsersListComponent
],
  templateUrl: './admin-home.component.html',
  styleUrl: './admin-home.component.css'
})
export class AdminHomeComponent implements OnInit{

  found_classes: Class[] = [];
  found_users: Account[] = [];

  classes_pattern: string = ''
  accounts_pattern: string = ''

  constructor(
    private apiService: ApiService
  ) {}

  ngOnInit()
  {
    this.reloadClasses('');
    this.reloadUsers('');
  }

  reloadClasses(pattern: string)
  {
    this.classes_pattern = pattern

    this.found_classes = [];
    this.classes_pattern = pattern
    this.searchNextClasses();
  }

  searchNextClasses()
  {
    this.apiService.classes.searchClass(this.classes_pattern, 10, this.found_classes.length).subscribe({
      next: (response) => {
        this.found_classes = this.found_classes.concat(response)
      }
    });
  }

  get found_classes_objects()
  {
    return this.found_classes.map(classe => ({
      id: classe.id,
      classe: classe
    }))
  }

  reloadUsers(pattern: string)
  {
    this.accounts_pattern = pattern;
    this.found_users = [];
    this.searchNextUsers();
  }

  searchNextUsers()
  {
    this.apiService.accounts.searchAccount(this.accounts_pattern, 10, this.found_users.length).subscribe({
      next: (response) => {
        this.found_users = this.found_users.concat(response)
      }
    });
  }

  get found_users_objects()
  {
    return this.found_users.map(user => ({
      id: user.id,
      profile: {
        ...user.profile,
        role: user.role
      }
    }))
  }

}
