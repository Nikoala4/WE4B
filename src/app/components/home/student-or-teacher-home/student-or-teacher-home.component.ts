import { Component } from '@angular/core';
import { ClassListComponent } from '../class-list/class-list.component';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-student-or-teacher-home',
  imports: [
    ClassListComponent
  ],
  templateUrl: './student-or-teacher-home.component.html',
  styleUrl: './student-or-teacher-home.component.css'
})
export class StudentOrTeacherHomeComponent {

  constructor(
    private authService: AuthService,
  ) {}

  get currentUser()
  {
    return this.authService.currentUser;
  }

}
