import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Account } from '../../../../nooble/api-objs/Account';
import { Role } from '../../../../nooble/api-objs/Role';
import { ApiService } from '../../../services/api.service';
import { MatDialog } from '@angular/material/dialog';
import { AlertDialogComponent } from '../../alert-dialog/alert-dialog.component';
import { RoleTranscriberPipe } from '../../../pipes/role-transcriber.pipe';

@Component({
  selector: 'app-account-role-settings',
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './account-role-settings.component.html',
  styleUrl: './account-role-settings.component.css'
})
export class AccountRoleSettingsComponent implements OnInit {
  @Input() editingAccount!: Account;
  @Input() currentUser!: Account;

  roles = {
    student: false,
    teacher: false,
    admin: false
  }

  @Output() update = new EventEmitter()

  constructor(
    private apiService: ApiService,
    private dialogs: MatDialog
  ) {}

  ngOnInit()
  {
    this.roles = {
      student: this.editingAccount.role == Role.STUDENT,
      teacher: this.editingAccount.role == Role.TEACHER || this.editingAccount.role == Role.TEACHER_ADMIN,
      admin: this.editingAccount.role == Role.ADMIN || this.editingAccount.role == Role.TEACHER_ADMIN
    }

  }

  resultingRole(): Role | null
  {
    if (this.roles.student)
    {
      return Role.STUDENT;
    } else if (this.roles.admin && this.roles.teacher) {
      return Role.TEACHER_ADMIN;
    } else if (this.roles.admin) {
      return Role.ADMIN;
    } else if (this.roles.teacher) {
      return Role.TEACHER;
    } else {
      return null;
    }
  }

  isCurrentUser() {
    return this.editingAccount.id === this.currentUser.id;
  }

  onRoleChange() {
    // Enforce exclusivity
    if (this.roles.student) {
      this.roles.admin = false;
      this.roles.teacher = false;
    }
    if (this.roles.admin || this.roles.teacher) {
      this.roles.student = false;
    }
  }

  saveRoles() {
    this.apiService.accounts.modifyAccountRole(this.editingAccount.id, this.resultingRole()!).subscribe({
      next: () => {
        this.dialogs.open(AlertDialogComponent, {
          data: {
            title: "Rôle appliquée",
            text: "Bienvenue à notre nouvel " + new RoleTranscriberPipe().transform(this.resultingRole() ?? undefined)
          }
        })
        this.update.emit();
      },
      error: () => {
        this.dialogs.open(AlertDialogComponent, {
          data: {
            title: "Impossible de modifier le rôle",
            text: "Malheureusement, une erreur est intervenue. "
          }
        })
      }
    });
  }


}
