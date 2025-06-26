import { Component } from '@angular/core';
import { SettingsMenuComponent } from "../settings-menu/settings-menu.component";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-settings',
  imports: [
    SettingsMenuComponent,
    RouterOutlet
  ],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css'
})
export class SettingsComponent {

}
