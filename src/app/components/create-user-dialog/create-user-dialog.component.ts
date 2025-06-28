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
  templateUrl: './create-user-dialog.component.html',
  styleUrl: './create-user-dialog.component.css'
})
export class CreateUserDialogComponent {
  error_message: string = ''
  userForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<CreateUserDialogComponent>,
    private fb: FormBuilder,
    private apiService: ApiService
  ) {
    this.userForm = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      mail_address: ['', [Validators.required, Validators.email]]
    });
  }

  createUser()
  {
    this.apiService.accounts.addAccount(this.userForm.get('mail_address')!.value, this.userForm.get('first_name')!.value, this.userForm.get('last_name')!.value).subscribe({
      next: (userId) => {
        this.dialogRef.close(userId.new_account);
      },
      error: (error) => {
        this.error_message = "Impossible de créer le compte";
      }
    })
  }
}
