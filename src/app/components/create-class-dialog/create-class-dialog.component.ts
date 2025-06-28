import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-user-dialog',
  imports: [
    MatDialogContent,
    MatDialogActions,
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './create-class-dialog.component.html',
  styleUrl: './create-class-dialog.component.css'
})
export class CreateClassDialogComponent {
  error_message: string = ''
  classForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<CreateClassDialogComponent>,
    private fb: FormBuilder,
    private apiService: ApiService
  ) {
    this.classForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  createClass()
  {
    this.apiService.classes.createNew(this.classForm.get('name')!.value, this.classForm.get('description')!.value).subscribe({
      next: (classId) => {
        this.dialogRef.close(classId.new_class);
      },
      error: (error) => {
        this.error_message = "Impossible de créer ce cours";
      }
    })
  }
}
