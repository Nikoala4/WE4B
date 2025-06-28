import { Component, EventEmitter, Inject, Input, OnInit, Output, PLATFORM_ID } from '@angular/core';
import { SearchBarComponent } from "../../searchbar/searchbar.component";
import { Account } from '../../../../nooble/api-objs/Account';
import { ApiService } from '../../../services/api.service';
import { UserTileComponent } from "../user-tile/user-tile.component";
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { platform } from 'os';
import { Profile } from '../../../../nooble/api-objs/Profile';

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
export class UsersListComponent implements OnInit {

  @Input() usersIds: string[] = [];
  @Input() users: {id: string, profile: Profile}[] = [];

  @Output() submit: EventEmitter<string> = new EventEmitter();

  searchTerms: string = ''

  constructor(
    @Inject(PLATFORM_ID) private platformId: string,
    private api: ApiService,
  ) {}

  ngOnInit() {
    if (!isPlatformBrowser(this.platformId)) return;

    this.loadUsers();
  }

  loadUsers() 
  {
    for (let userId of this.usersIds){
      let currentUserId = userId;

      this.api.profile.getInformation(currentUserId).subscribe(profile => {
        this.users.push({id: currentUserId, profile})
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
