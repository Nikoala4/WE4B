import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { Router, UrlTree } from '@angular/router';

@Component({
  selector: 'app-settings-menu',
  imports: [
    NgIf
  ],
  templateUrl: './settings-menu.component.html',
  styleUrl: './settings-menu.component.css'
})
export class SettingsMenuComponent {
  localUrl: string|null = null;

  constructor(private router: Router) {
  };

  ngOnInit()
  {
    this.localUrl = this.router.getCurrentNavigation()?.finalUrl?.toString() ?? null;
  }

}
