import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, EventEmitter, Inject, Input, Output, PLATFORM_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { ApiService } from '../../../services/api.service';
import { Account } from '../../../../nooble/api-objs/Account';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../confirm-dialog/confirm-dialog.component';
import { AlertDialogComponent } from '../../alert-dialog/alert-dialog.component';
import { ProfileImageSelectorComponent } from "../../profile-image-selector/profile-image-selector.component";
import { DecorationSelectorComponent } from "../../decoration-selector/decoration-selector.component";
import { Decoration } from '../../../../nooble/api-objs/Decoration';
import { Router } from '@angular/router';

@Component({
  selector: 'app-misc-profile-settings',
  imports: [
    CommonModule,
    FormsModule,
    ProfileImageSelectorComponent,
    DecorationSelectorComponent
],
  templateUrl: './misc-profile-settings.component.html',
  styleUrl: './misc-profile-settings.component.css'
})
export class MiscProfileSettingsComponent {
  @Input() editingAccount!: Account;
  @Input() currentUser!: Account;

  email = '';

  first_name: string = ""
  last_name: string = ""
  description: string = ""

  selectedDecoration: string | null = null
  selectedProfileImage: string | null = null

  @Output() update = new EventEmitter()

  constructor(
    private apiService: ApiService,
    private dialogs: MatDialog,
    private router: Router
  ) {};

  ngOnInit()
  {
    this.email = this.editingAccount.mail;
    this.first_name = this.editingAccount.profile.first_name;
    this.last_name = this.editingAccount.profile.last_name;
    this.description = this.editingAccount.profile.description;

    this.selectedDecoration = this.editingAccount.profile.active_decoration;
    this.selectedProfileImage = this.editingAccount.profile.profile_image;

  }

  isCurrentUser() {
    return this.editingAccount.id === this.currentUser.id;
  }

  canSaveEmail() {
    return this.email !== this.editingAccount.mail && this.validateEmail(this.email);
  }

  validateEmail(email: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  saveEmail() {
    this.apiService.accounts.modifyAccountMail(this.editingAccount.id, this.email).subscribe({
      next: () => {
        this.dialogs.open(AlertDialogComponent, {
          data: {
            title: "L'adresse a bien été changée",
            text: "La nouvelle adresse mail " + this.email + " a été appliquée"
          }
        })
        this.update.emit();
      },
      error: () => {
        this.dialogs.open(AlertDialogComponent, {
          data: {
            title: "Impossible de sauvegarder cette adresse mail",
            text: "On ne peut pas déshabiter Paul pour habiter Pierre"
          }
        })
      }
    })
  }

  onImageSelected(imageId: string | null)
  {
    this.selectedProfileImage = imageId;
  }

  onDecorationSelected(decoration: Decoration | null)
  {
    this.selectedDecoration = decoration?.id ?? null;
  }

  saveProfile() {
    this.apiService.profile.modify(this.editingAccount.id, this.first_name, this.last_name, this.selectedProfileImage, this.selectedDecoration, this.editingAccount.profile.active_badges.map((badgeDescriptor) => badgeDescriptor[0]), this.description).subscribe({
      next: () => {
        this.dialogs.open(AlertDialogComponent, {
          data: {
            title: "Profil modifié avec succès!",
            text: "Sa boîte mail a bel et bien été spammée. "
          }
        })
        this.update.emit();
      },
      error: () => {
        this.dialogs.open(AlertDialogComponent, {
          data: {
            title: "Une erreur est intervenue",
            text: "Vous a-t-on permis?"
          }
        })
      }
    });
  }

  deleteUser() {
    this.dialogs.open(ConfirmDialogComponent, {
      data: {
        title: "Supprimer cet utilisateur?",
        text: "Il vivra. Mais pour tout le monde il sera mort. "
      }
    }).afterClosed().subscribe({
      next: (accepted: boolean) => {
        if (accepted)
        {
          this.apiService.accounts.deleteAccount(this.editingAccount.id).subscribe({
            next: () => {
              this.router.navigateByUrl('/');
            }
          })
        }
      }
    });
  }
}
