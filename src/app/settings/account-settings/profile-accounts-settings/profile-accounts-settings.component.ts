import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { ProfileImageSelectorComponent } from "../../../profile-image-selector/profile-image-selector.component";
import { ApiService } from '../../../services/api.service';
import { isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BadgesSelectorComponent } from "../../../badges-selector/badges-selector.component";
import { DecorationSelectorComponent } from "../../../decoration-selector/decoration-selector.component";
import { BadgeDescriptor } from '../../../../nooble/api-objs/BadgeDescriptor';
import { first } from 'lodash';

@Component({
  selector: 'app-profile-accounts-settings',
  imports: [
    ProfileImageSelectorComponent,
    FormsModule,
    BadgesSelectorComponent,
    DecorationSelectorComponent
],
  templateUrl: './profile-accounts-settings.component.html',
  styleUrl: './profile-accounts-settings.component.css'
})
export class ProfileAccountSettingsComponent {
  first_name: string|null = null;
  last_name: string|null = null;
  description: string|null = null;

  selectedImage: string|null = null;
  currentImage: string|null = null;

  activeBadges: string[] = [];
  selectedBadges: string[] = [];

  activeDecoration: string | null = null;
  selectedDecoration: string | null = null;

  onBadgeSelectionChanged(newSelection: string[]) {
    this.activeBadges = newSelection;
  }
  constructor(@Inject(PLATFORM_ID) private platformId: string, private apiService: ApiService) {}

  ngOnInit()
  {
    if (!isPlatformBrowser(this.platformId))
      return

    this.first_name = null
    this.last_name = null
    this.description = null

    this.apiService.profile.getInformation().subscribe({
      next: (response) => {
        this.first_name = response.first_name;
        this.last_name = response.last_name;
        this.description = response.description;
        this.selectedImage = response.profile_image;
        this.currentImage = response.profile_image;
        this.activeBadges = response.active_badges.map(badge => badge[0]);
        this.selectedBadges = this.activeBadges;
        this.activeDecoration = response.active_decoration;
        this.selectedDecoration = this.activeDecoration;
      }
    });
  }

  onProfileImageSelected(imageId: string | null)
  {
    this.selectedImage = imageId;
  }
  
  onBadgesSelectionChanged(newBadgesSelection: string[])
  {
    this.selectedBadges = newBadgesSelection;
  }

  onSaveClicked()
  {
    let object = {
      first_name: this.first_name,
      last_name: this.last_name,
      description: this.description,

      profile_image: this.selectedImage,
      active_badges: this.selectedBadges,
      active_decoration: this.selectedDecoration
    }
    alert(JSON.stringify(object));

    this.apiService.profile.update(
      this.first_name!,
      this.last_name!,
      this.selectedImage,
      this.selectedDecoration,
      this.activeBadges,
      this.description
    ).subscribe({
      next: () => {
        alert("Modification enregistrée!")

        this.activeBadges = this.selectedBadges;
        this.activeDecoration = this.selectedDecoration;
        this.currentImage = this.selectedImage;
      }
    })
  }

  onDecorationSelected(decoration: string | null): void {
    this.selectedDecoration = decoration;
  }
}
