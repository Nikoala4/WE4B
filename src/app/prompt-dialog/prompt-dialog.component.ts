import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-prompt-dialog',
  template: './prompt-dialog.component.ts'
})
export class PromptDialogComponent {
  value = '';

  constructor(
    public dialogRef: MatDialogRef<PromptDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { title: string; placeholder?: string }
  ) {}
}
