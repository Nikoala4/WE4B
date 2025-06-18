import { Component } from '@angular/core';
import { AdminHomeComponent } from "./admin-home/admin-home.component";
import { TeacherHomeComponent } from "./teacher-home/teacher-home.component";
import { StudentHomeComponent } from "./student-home/student-home.component";

@Component({
  selector: 'app-home',
  imports: [AdminHomeComponent, TeacherHomeComponent, StudentHomeComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
