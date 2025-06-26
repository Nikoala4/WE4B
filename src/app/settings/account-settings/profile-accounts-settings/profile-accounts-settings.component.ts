import { Component } from '@angular/core';
import { ProfileImageSelectorComponent } from "../../../profile-image-selector/profile-image-selector.component";

@Component({
  selector: 'app-profile-accounts-settings',
  imports: [ProfileImageSelectorComponent, ProfileImageSelectorComponent],
  templateUrl: './profile-accounts-settings.component.html',
  styleUrl: './profile-accounts-settings.component.css'
})
export class ProfileAccountSettingsComponent {

}
