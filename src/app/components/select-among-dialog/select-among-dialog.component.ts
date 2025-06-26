import { CommonModule } from '@angular/common';
import { Component, Inject, InjectionToken, Input, Optional } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { SelectAmongListComponent } from "./select-among-list/select-among-list.component";

export const INPUT_IMAGE = new InjectionToken<string>('INPUT_IMAGE');

@Component({
  standalone: true,
  imports: [
    MatDialogModule,
    CommonModule,
    FormsModule,
    SelectAmongListComponent
],
  templateUrl: './select-among-dialog.component.html'
})
export class SelectAmongDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<SelectAmongDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      title: string,
      selectionList: {url:string, name:string}[]
    }
  ) { }
}
