import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-class-settings',
  templateUrl: './class-settings.component.html',
  imports: [
    CommonModule
  ],
  styleUrls: ['./class-settings.component.css'],
  standalone: true
})
export class ClassSettingsComponent implements OnInit {
  @Input() name: string = '';
  @Input() description: string = '';

  @Output() nameChange = new EventEmitter<string>();
  @Output() descriptionChange = new EventEmitter<string>();
  @Output() delete = new EventEmitter<void>();

  currentlyAdmin: boolean = false;

  constructor(
    private authService: AuthService
  ) {}

  ngOnInit() 
  {
    this.currentlyAdmin = this.authService.isAdmin();
  }

  onNameChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.nameChange.emit(input.value);
  }

  onDescriptionChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.descriptionChange.emit(input.value);
  }
}
