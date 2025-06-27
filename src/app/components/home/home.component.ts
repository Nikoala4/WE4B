import { Component } from '@angular/core';
import { AdminHomeComponent } from "./admin-home/admin-home.component";
import { TeacherHomeComponent } from "./teacher-home/teacher-home.component";
import { StudentHomeComponent } from "./student-home/student-home.component";
import { ClassListComponent } from './class-list/class-list.component';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-home',
  imports: [AdminHomeComponent, TeacherHomeComponent, StudentHomeComponent, ClassListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  
  constructor(private authService: AuthService) {}

  get account(){
    return this.authService.currentUser!
  }

}
