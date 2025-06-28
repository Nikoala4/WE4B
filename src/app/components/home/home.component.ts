import { Component } from '@angular/core';

import { AdminHomeComponent } from "./admin-home/admin-home.component";
import { StudentOrTeacherHomeComponent } from "./student-or-teacher-home/student-or-teacher-home.component";
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { ThreadListComponent } from "../thread-list/thread-list.component";


@Component({
  selector: 'app-home',
  imports: [
    AdminHomeComponent,
    StudentOrTeacherHomeComponent,
    CommonModule,
    ThreadListComponent
],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  
  constructor(private authService: AuthService
  ) {}

  get currentUser()
  {
    return this.authService.currentUser;
  }

  get role()
  {
    return this.authService.currentRole;
  }

}
