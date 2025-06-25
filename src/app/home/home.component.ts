import { Component } from '@angular/core';
import { AdminHomeComponent } from "./admin-home/admin-home.component";
import { TeacherHomeComponent } from "./teacher-home/teacher-home.component";
import { StudentHomeComponent } from "./student-home/student-home.component";
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [AdminHomeComponent, TeacherHomeComponent, StudentHomeComponent, HeaderComponent, FooterComponent, RouterOutlet],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
