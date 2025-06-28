import { Component, OnInit } from '@angular/core';
import { Profile } from '../../../../nooble/api-objs/Profile';
import { ApiService } from '../../../services/api.service';
import { Account } from '../../../../nooble/api-objs/Account';
import { SearchBarComponent } from '../../searchbar/searchbar.component';
import { NgFor } from '@angular/common';
import { ProfileTileComponent } from '../profile-tile/profile-tile.component';

@Component({
  selector: 'app-profile-list',
  imports: [SearchBarComponent, NgFor, ProfileTileComponent],
  templateUrl: './profile-list.component.html',
  styleUrl: './profile-list.component.css'
})
export class ProfileListComponent implements OnInit{
  public accounts : Account[] = []

  constructor(private api: ApiService){}

  ngOnInit(){
    this.api.accounts.searchAccount("", 10, 0).subscribe(accounts => {
      this.accounts = accounts
    })
  }

}
