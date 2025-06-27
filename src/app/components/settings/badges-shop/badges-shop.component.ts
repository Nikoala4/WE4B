import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Safe } from '../../../../nooble/api-objs/Safe';
import { BadgeDescriptor } from '../../../../nooble/api-objs/BadgeDescriptor';
import { PathResolverService } from '../../../services/path-resolver.service';
import { ApiGetBadgeInfoResponse } from '../../../../nooble/api-comm/GetBadgeInfoResponse';
import { ApiService } from '../../../services/api.service';
import { BadgePopupService } from '../../../services/badge-popup.service';
import { MatDialog } from '@angular/material/dialog';
import { BuyBadgeDialogComponent } from '../../buy-badge-dialog/buy-badge-dialog.component';

@Component({
  selector: 'app-badges-shop',
  imports: [
    CommonModule
  ],
  templateUrl: './badges-shop.component.html',
  styleUrl: './badges-shop.component.css'
})
export class BadgesShopComponent implements OnInit {

  safe: Safe | null = null

  reachableBadges: {badge: BadgeDescriptor, details: ApiGetBadgeInfoResponse}[] = []
  unreachableBadges: {badge: BadgeDescriptor, details: ApiGetBadgeInfoResponse}[] = []
  ownedBadges: {badge: BadgeDescriptor, details: ApiGetBadgeInfoResponse}[] = []

  constructor(
    @Inject(PLATFORM_ID) private platformId: string,
    private pathResolver: PathResolverService,
    private apiService: ApiService,
    private badgePopup: BadgePopupService,
    private dialogs: MatDialog
  ) {}

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) return

    this.reloadSafeAndBadges();
  }

  getBadgeImage(badge: BadgeDescriptor)
  {
    return this.pathResolver.getBadgeThumbnailPath(...badge);
  }

  reloadSafeAndBadges()
  {
    this.apiService.safe.get().subscribe({
      next: (safe) => {
        this.safe = safe

        let ownedBadges = []

        for (let badge of safe.badges)
        {
          let currentBadge = badge;

          this.apiService.badges.getInformation(...currentBadge).subscribe({
            next: (response) => {
              ownedBadges.push({
                badge: currentBadge,
                details: response
              })

              if (ownedBadges.length === safe.badges.length)
              {
                this.ownedBadges = ownedBadges;
              }
            }
          })
        }
      }
    })

    this.apiService.badges.getList().subscribe({
      next: (badges) => {
        let reachedBadges = [];

        for (let reachableBadge of badges.reached)
        {
          let currentBadge = reachableBadge;

          this.apiService.badges.getInformation(currentBadge.name, currentBadge.level).subscribe({
            next: (response) => {
              reachedBadges.push({
                badge: [currentBadge.name, currentBadge.level] as [string, number],
                details: response
              })

              if (badges.reached.length == reachedBadges.length)
              {
                this.reachableBadges = reachedBadges.sort((a, b) => b.badge[1] - a.badge[1]);
              }
            }
          })
        }

        let unreachedBadges = [];

        for (let unreachableBadge of badges.unreached)
        {
          let currentBadge = unreachableBadge;

          this.apiService.badges.getInformation(currentBadge.name, currentBadge.level).subscribe({
            next: (response) => {
              unreachedBadges.push({
                badge: [currentBadge.name, currentBadge.level] as [string, number],
                details: response
              })

              if (badges.unreached.length == unreachedBadges.length)
              {
                this.unreachableBadges = unreachedBadges.sort((a, b) => b.badge[1] - a.badge[1]);
              }
            }
          })
        }
      }
    })
  }

  onOwnedBadgeClicked(badge: BadgeDescriptor) 
  {
    this.badgePopup.openPopup(...badge);
  }

  onBuyBadgeClicked(badge: BadgeDescriptor)
  {
    this.dialogs.open(BuyBadgeDialogComponent, {
      data: {
        badge: badge
      }
    }).afterClosed().subscribe({
      next: (bought) => {
        if (bought)
        {
          this.reloadSafeAndBadges()
        }
      }
    })
  }

}
