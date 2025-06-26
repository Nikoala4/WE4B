import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink, UrlTree } from '@angular/router';

@Component({
  selector: 'app-settings-menu',
  imports: [
    NgIf,
    RouterLink
  ],
  templateUrl: './settings-menu.component.html',
  styleUrl: './settings-menu.component.css'
})
export class SettingsMenuComponent {
  constructor(public router: Router) {
  };

}
