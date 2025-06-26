import { Component } from '@angular/core';
import { AbstractControl, FormGroup, NonNullableFormBuilder, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-change-password',
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './account-modify-password.component.html',
  styleUrl: './account-modify-password.component.css'
})
export class AccountModifyPasswordComponent {
  passwordForm: FormGroup;
  message: string = '';
  messageType: 'success' | 'error' | '' = '';

  constructor(
    private fb: NonNullableFormBuilder,
    private apiService: ApiService
  ) {
    this.passwordForm = this.fb.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    }, {
      validators: this.passwordsMatchValidator
    });
  }

  passwordsMatchValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const group = control as FormGroup;
    const password = group.get('newPassword')?.value;
    const confirm = group.get('confirmPassword')?.value;

    return password === confirm ? null : { passwordMismatch: true };
  }

  async onSubmit() {
    if (this.passwordForm.invalid) return;

    const { currentPassword, newPassword } = this.passwordForm.value as {currentPassword: string, newPassword: string};

    this.apiService.accounts.updateSelfPassword(currentPassword, newPassword).subscribe({
      next: () => {
        this.message = "Votre mot de passe a été modifié avec succès!";
        this.messageType = "success";

        this.passwordForm.get("currentPassword")?.setValue("")
        this.passwordForm.get("newPassword")?.setValue("")
        this.passwordForm.get("confirmPassword")?.setValue("")
      },
      error: () => {
        this.message = "Une erreur s'est produite";
        this.messageType = "error";
      }
    })

  }
}
