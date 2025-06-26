import { CommonModule } from '@angular/common';
import { Component, Inject, InjectionToken, Optional } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

export const INPUT_IMAGE = new InjectionToken<string>('INPUT_IMAGE');

@Component({
  standalone: true,
  imports: [
    MatDialogModule,
    CommonModule,
    FormsModule
  ],
  templateUrl: './confirm-dialog.component.html'
})
export class ConfirmDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { title: string; text: string; }
  ) {  }
}
