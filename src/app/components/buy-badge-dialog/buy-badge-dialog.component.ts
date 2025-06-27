import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, InjectionToken, Input, OnInit, Optional, PLATFORM_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogActions, MatDialogContent, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { ApiService } from '../../services/api.service';
import { BadgeDescriptor } from '../../../nooble/api-objs/BadgeDescriptor';
import { ApiGetBadgeInfoResponse } from '../../../nooble/api-comm/GetBadgeInfoResponse';
import { BadgePopupService } from '../../services/badge-popup.service';
import { AlertDialogComponent } from '../alert-dialog/alert-dialog.component';
import { BuyBadgeDialogContentComponent } from "./buy-badge-dialog-content/buy-badge-dialog-content.component";
import { PathResolverService } from '../../services/path-resolver.service';

export const INPUT_IMAGE = new InjectionToken<string>('INPUT_IMAGE');

@Component({
  standalone: true,
  imports: [
    MatDialogModule,
    CommonModule,
    FormsModule,
    BuyBadgeDialogContentComponent
],
  templateUrl: './buy-badge-dialog.component.html'
})
export class BuyBadgeDialogComponent implements OnInit {
  constructor(
    @Inject(PLATFORM_ID) private platformId: string,
    public dialogRef: MatDialogRef<BuyBadgeDialogComponent>,
    private badgePopup: BadgePopupService,
    private dialogs: MatDialog,
    private apiService: ApiService,
    @Inject(MAT_DIALOG_DATA) public data: {
      badge: BadgeDescriptor
    }
  ) {}

  quota: number = -1;
  details: ApiGetBadgeInfoResponse | null = null;

  reachable: boolean = false;

  ngOnInit()
  {
    if (!isPlatformBrowser(this.platformId)) return

    this.apiService.safe.getQuota().subscribe({
      next: (response) => {
        this.quota = response
      }
    });

    this.apiService.badges.getInformation(...this.data.badge).subscribe({
      next: (response) => {
        this.details = response;
      }
    })

    this.apiService.badges.getList().subscribe({
      next: (result) => {
        if (result.reached.some((badge) => badge.name == this.data.badge[0] && badge.level == this.data.badge[1]))
        {
          this.reachable = true;
        } else {
          this.reachable = false;
        }
      }
    })
  }

  isPurchasable(): boolean
  {
    return this.reachable && this.details !== null && this.quota > this.details.price    
  }

  onBuyLaunched()
  {
    this.apiService.badges.buy(this.data.badge[0]).subscribe({
      next: () => {
        this.badgePopup.openPopup(...this.data.badge);

        this.dialogRef.close(true);
      },
      error: () => {
        this.dialogRef.close(false);
        this.dialogs.open(AlertDialogComponent, {
          data: {
            title: "Ce badge n'a pas pu être acheté",
            text: "Ça vous fera des économies!"
          }
        })
      }
    });
  }
}
