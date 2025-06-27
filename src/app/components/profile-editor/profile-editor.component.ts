import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MiscProfileSettingsComponent } from "./misc-profile-settings/misc-profile-settings.component";
import { AccountRoleSettingsComponent } from "./account-role-settings/account-role-settings.component";
import { AccountClassesSelectionComponent } from "./account-classes-selection/account-classes-selection.component";
import { TabGroupComponent } from "../tab-group/tab-group.component";
import { AuthService } from '../../services/auth.service';
import { ApiService } from '../../services/api.service';
import { Account } from '../../../nooble/api-objs/Account';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';
import { Role } from '../../../nooble/api-objs/Role';

@Component({
  selector: 'app-profile-editor',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MiscProfileSettingsComponent,
    AccountRoleSettingsComponent,
    AccountClassesSelectionComponent,
    TabGroupComponent
],
  templateUrl: './profile-editor.component.html',
  styleUrl: './profile-editor.component.css',
})
export class ProfileEditorComponent {
  editingAccount : Account | null = null;

  userImage = '...'; // base64 string
  profileImage = 'data:image/png;base64,...';

  canSaveRoles = true;

  selectedTab = 0;

  userClasses: {name: string, description: string, thumbnail: string, id: string}[] = [];
  filteredClasses: {name: string, description: string, thumbnail: string, id: string}[] = [];
  classSearchTerm = '';

  currentUser: Account | null = null

  constructor(
    @Inject(PLATFORM_ID) private platformId: string,
    private authService: AuthService,
    private apiService: ApiService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    if (!isPlatformBrowser(platformId)) return;

    this.currentUser = this.authService.getCurrentUser()

    this.reloadUserData();

  }

  reloadUserData()
  {

    this.route.paramMap.pipe(
      map((params, index) => {
        const id = params.get('userId');

        return id;
      })
    ).subscribe(async (userId) => {
      if (userId === null)
      {
        this.router.navigate(['/']);
        return;
      }

      this.apiService.accounts.getAccountInformation(userId).subscribe({
        next: (response) => {
          this.editingAccount = response
        }
      })
    })  
  }

  isCurrentUser() {
    return this.editingAccount?.id === this.currentUser?.id;
  }

  selectTab(tab: number) {
    this.selectedTab = tab;
  }

  hasClassAccess(): boolean {
    return this.editingAccount?.role != Role.ADMIN;
  }

}
