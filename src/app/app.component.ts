import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BadgePopupComponent } from "./badge-popup/badge-popup.component"; 
import { BadgePopupService } from './services/badge-popup.service';
import { BadgeDescriptor } from '../nooble/api-objs/BadgeDescriptor';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true, 
  imports: [
    RouterOutlet,
    FormsModule,
    BadgePopupComponent,
    NgIf
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'nooble-angular';

  badgePopupState: BadgeDescriptor | null = null;

  constructor(private badgePopupService: BadgePopupService) {}

  ngOnInit()
  {
    this.badgePopupService.badgePopupRequest.subscribe((badge) => {
      this.badgePopupState = badge;
    })
  }

}
