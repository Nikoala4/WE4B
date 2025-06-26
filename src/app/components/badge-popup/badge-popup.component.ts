import { Component, Inject, Input, PLATFORM_ID } from '@angular/core';
import { ApiGetBadgeInfoResponse } from '../../../nooble/api-comm/GetBadgeInfoResponse';
import { BadgeDescriptor } from '../../../nooble/api-objs/BadgeDescriptor';
import { ApiService } from '../../services/api.service';
import { PathResolverService } from '../../services/path-resolver.service';
import { trigger, transition, style, animate } from '@angular/animations';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { BadgePopupService } from '../../services/badge-popup.service';

@Component({
  selector: 'app-badge-popup',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './badge-popup.component.html',
  styleUrl: './badge-popup.component.css',
  animations: [
    trigger('fade', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('200ms ease-in', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        animate('200ms ease-out', style({ opacity: 0 }))
      ])
    ])
  ],
  host: { '[@fade]': 'true' }


})
export class BadgePopupComponent {
  @Input() badge: BadgeDescriptor = ["", -1]
  badgeInformation: ApiGetBadgeInfoResponse = {
    title: "",
    description: "",
    max_level: 0,
    price: 0
  }

  thumbnailUrl: string = ""

  constructor(@Inject(PLATFORM_ID) private platformId: string, private apiService: ApiService, private pathResolver: PathResolverService, private service: BadgePopupService) {}

  ngOnInit()
  {
    if (!isPlatformBrowser(this.platformId)) return

    this.apiService.badges.getInformation(this.badge[0], this.badge[1]).subscribe({
      next: (response) => {
        this.badgeInformation = response
        this.thumbnailUrl = this.pathResolver.getBadgeThumbnailPath(this.badge[0], this.badge[1])
      }
    });
  }

  onClose()
  {
    this.service.closePopup();
  }

  log(data: any)
  {
    console.log(data, "transition end")
  }

}
