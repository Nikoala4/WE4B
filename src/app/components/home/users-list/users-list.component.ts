import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SearchBarComponent } from "../../searchbar/searchbar.component";
import { Account } from '../../../../nooble/api-objs/Account';
import { ApiService } from '../../../services/api.service';
import { UserTileComponent } from "../user-tile/user-tile.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-users-list',
  imports: [
    SearchBarComponent,
    UserTileComponent,
    CommonModule
  ],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.css'
})
export class UsersListComponent {

  @Input() usersIds: string[] = [];
  @Input() users: Account[] = [];

  @Output() submit: EventEmitter<string> = new EventEmitter();

  searchTerms: string = ''

  constructor(
    private api: ApiService
  ) {}

  ngOnInit() {
    for (let userId of this.usersIds){
      let currentUserId = userId;

      this.api.accounts.getAccountInformation(currentUserId).subscribe(account => {
        this.users.push(account)
      })

    };

  }

  onSearch(terms: string)
  {
    this.searchTerms = terms;
  }

  onSubmit(terms: string)
  {
    this.submit.emit(terms);
  }

}
