import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Account } from '../../../../nooble/api-objs/Account';

@Component({
  selector: 'app-account-classes-selection',
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './account-classes-selection.component.html',
  styleUrl: './account-classes-selection.component.css'
})
export class AccountClassesSelectionComponent {

}
