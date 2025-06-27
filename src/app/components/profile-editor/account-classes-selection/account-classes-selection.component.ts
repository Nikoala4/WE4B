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
  @Input() editingAccount!: Account;
  @Input() currentUser!: Account;

  @Output() update = new EventEmitter()

  userClasses: {name: string, description: string, thumbnail: string, id: string}[] = [];
  filteredClasses: {name: string, description: string, thumbnail: string, id: string}[] = [];
  classSearchTerm = '';

  searchClasses() {
    this.filteredClasses = this.userClasses.filter(c =>
      c.name.toLowerCase().includes(this.classSearchTerm.toLowerCase())
    );
  }

  modifyClasses() {
    // Open modal to add/remove classes
  }

}
