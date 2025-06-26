import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Role } from '../../../nooble/api-objs/Role';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ClassOverviewComponent } from "../class-overview/class-overview.component";
import { ClassEditorComponent } from "../class-editor/class-editor.component";

@Component({
  selector: 'app-class',
  imports: [
    CommonModule,
    ClassOverviewComponent,
    ClassEditorComponent
],
  templateUrl: './class.component.html',
  styleUrl: './class.component.css'
})
export class ClassComponent implements OnInit {

  role: Role|null = null

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit()
  {
    let account = this.authService.getCurrentUser();

    if (account === null){
      return;
    }

    this.role = this.authService.getCurrentUser()!.role;
  }

}
