import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, Input, PLATFORM_ID } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { PathResolverService } from '../../../services/path-resolver.service';
import { BadgeDescriptor } from '../../../../nooble/api-objs/BadgeDescriptor';
import { ApiGetBadgeInfoResponse } from '../../../../nooble/api-comm/GetBadgeInfoResponse';

@Component({
  selector: 'app-buy-badge-dialog-content',
  imports: [
    CommonModule
  ],
  templateUrl: './buy-badge-dialog-content.component.html',
  styleUrl: './buy-badge-dialog-content.component.css'
})
export class BuyBadgeDialogContentComponent {

  @Input() reachable: boolean = false;
  @Input() quota: number = -1;
  @Input() badge: BadgeDescriptor|null = null;

  @Input() details: ApiGetBadgeInfoResponse | null = null;

  constructor(
    private pathResolver: PathResolverService,
  ) {}

  getBadgeThumbnail()
  {
    if (this.badge) return this.pathResolver.getBadgeThumbnailPath(...this.badge);

    else return ""
  }

  isPurchasable(): boolean
  {
    return this.reachable && this.details !== null && this.quota > this.details.price    
  }

}
