import { Component, EventEmitter, Inject, Input, Output, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { PathResolverService } from '../../services/path-resolver.service';
import { BadgeDescriptor } from '../../../nooble/api-objs/BadgeDescriptor';
import { ApiGetBadgeInfoResponse } from '../../../nooble/api-comm/GetBadgeInfoResponse';

@Component({
  selector: 'app-badges-selector',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './badges-selector.component.html',
  styleUrl: './badges-selector.component.css'
})
export class BadgesSelectorComponent {
  ownedBadges: BadgeDescriptor[] = [];
  badgeInfo: {[key: string]: ApiGetBadgeInfoResponse | undefined} = {}

  @Input() selectedBadges: string[] = [];
  @Input() currentSelectedBadges: string[] = [];
  @Output() selectionChanged = new EventEmitter<string[]>();

  constructor(
    private apiService: ApiService,
    private pathResolver: PathResolverService,
    @Inject(PLATFORM_ID) private platformId: string
  ) {}

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    this.apiService.safe.getBadges().subscribe({
      next: (response) => {
        this.ownedBadges = response

        this.selectedBadges = [...this.currentSelectedBadges];

        for (let badge of response)
        {
          this.apiService.badges.getInformation(badge[0], badge[1]).subscribe({
            next: (response) => {
              this.badgeInfo[badge[0]] = response
            }
          })
        }
      }
    })
  }

  getBadgeThumbnail(badge: BadgeDescriptor)
  {
    return this.pathResolver.getBadgeThumbnailPath(badge[0], badge[1]);
  }

  toggleBadge(id: string) {
    const index = this.selectedBadges.indexOf(id);

    if (index >= 0) {
      this.selectedBadges.splice(index, 1);
    } else {
      this.selectedBadges.push(id);
    }

    this.selectionChanged.emit([...this.selectedBadges]);
  }

  isSelected(id: string): boolean {
    return this.selectedBadges.includes(id);
  }
}
