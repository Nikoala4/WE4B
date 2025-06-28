import { Component, Input } from '@angular/core';
import { Account } from '../../../../nooble/api-objs/Account';
import { RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';
import { Role } from '../../../../nooble/api-objs/Role';
import { CookiesService } from '../../../services/cookies.service';

@Component({
  selector: 'app-profile-tile',
  imports: [RouterLink, NgIf],
  templateUrl: './profile-tile.component.html',
  styleUrl: './profile-tile.component.css'
})
export class ProfileTileComponent {
  @Input() account!: Account

  constructor(private cookies: CookiesService){
  }

  get isAdmin(){
    return this.account.role === Role.ADMIN || this.account.role === Role.TEACHER_ADMIN
  }

  get isStudent(){
    return this.account.role === Role.STUDENT
  }

  get isTeacher(){
    return this.account.role === Role.TEACHER || this.account.role === Role.TEACHER_ADMIN
  }

}
