import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ApiGetClassDataResponse } from '../../../../nooble/api-comm/GetClassDataResponse';
import { AuthService } from '../../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-class-tile',
  imports: [
    RouterLink,
    CommonModule
  ],
  templateUrl: './class-tile.component.html',
  styleUrl: './class-tile.component.css'
})
export class ClassTileComponent {
  @Input() classe!: ApiGetClassDataResponse
  @Input() classId!: string

  constructor(
    private authService: AuthService
   ) {}

  ngOnInit()
  {
    
  }

  get isTeacher()
  {
    return this.authService.isTeacher();
  }
}
