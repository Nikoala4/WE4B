import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { Safe } from '../../../../nooble/api-objs/Safe';
import { ApiService } from '../../../services/api.service';
import { PathResolverService } from '../../../services/path-resolver.service';
import { Decoration } from '../../../../nooble/api-objs/Decoration';
import { FileType } from '../../../../nooble/api-objs/FileType';
import { MatDialog } from '@angular/material/dialog';
import { BuyDecorationDialogComponent } from '../../buy-decoration-dialog/buy-decoration-dialog.component';

@Component({
  selector: 'app-decoration-shop',
  imports: [
    CommonModule
  ],
  templateUrl: './decoration-shop.component.html',
  styleUrl: './decoration-shop.component.css'
})
export class DecorationShopComponent {
  safe: Safe = {
    quota: -1,
    decorations: [],
    badges: []
  }

  newDecorations: Decoration[] = []
  ownedDecorations: Decoration[] = []

  constructor(
    @Inject(PLATFORM_ID) private platformId: string,
    private apiService: ApiService,
    private pathResolver: PathResolverService,
    private dialogs: MatDialog
  ) {}

  ngOnInit()
  {
    if (!isPlatformBrowser(this.platformId)) return;

    this.reloadShop();

  }

  reloadShop()
  {
    this.apiService.safe.get().subscribe({
      next: (safe) => {
        this.safe = safe;

        let ownedDecorations = [];

        for (let decorationId of this.safe.decorations)
        {
          let currentDecorationId = decorationId;

          this.apiService.decorations.getInformation(currentDecorationId).subscribe({
            next: (details) => {
              ownedDecorations.push({
                id: decorationId,
                ...details
              })

              if (ownedDecorations.length === safe.decorations.length)
              {
                this.ownedDecorations = ownedDecorations;
              }
            }
          })
        }
      }
    })

    this.apiService.decorations.listDecorations().subscribe({
      next: (decorations) => {
        this.newDecorations = decorations
      }
    })
  }

  getDecorationThumbnail(decorationImageId: string)
  {
    return this.pathResolver.getResourcePath(decorationImageId, FileType.DECORATION_BANNER);
  }

  launchDecorationPurchase(decoration: Decoration)
  {
    this.dialogs.open(BuyDecorationDialogComponent, {
      data: {
        decoration: decoration.id
      }
    }).afterClosed().subscribe({
      next: (bought) => {
        if (bought)
          this.reloadShop()
      }
    })
  }
}