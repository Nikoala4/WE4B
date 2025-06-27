import { Component, EventEmitter, Inject, Input, Output, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Decoration } from '../../../nooble/api-objs/Decoration';
import { ApiGetDecorationInformationResponse } from '../../../nooble/api-comm/GetDecorationInfoResponse';
import { ApiService } from '../../services/api.service';
import { PathResolverService } from '../../services/path-resolver.service';
import { FileType } from '../../../nooble/api-objs/FileType';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { AlertDialogComponent } from '../alert-dialog/alert-dialog.component';

@Component({
  selector: 'app-decoration-selector',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './decoration-selector.component.html',
  styleUrls: ['./decoration-selector.component.css']
})
export class DecorationSelectorComponent {
  ownedDecorations: Decoration[] = [];

  @Input() currentDecoration: string | null = null;
  @Input() selectedDecoration: string | null = null;
  @Output() decorationSelected = new EventEmitter<Decoration | null>();
  @Output() decorationDeleted = new EventEmitter<Decoration | null>();

  @Input() onDecorationsChanged: EventEmitter<null> = new EventEmitter()

  @Input() overwriteOrNothing : 'overwrite' | 'nothing' = 'nothing'

  constructor(
    private apiService: ApiService,
    private pathResolver: PathResolverService,
    private dialogs: MatDialog,
    @Inject(PLATFORM_ID) private platformId: string
  ) {}

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    this.onDecorationsChanged.subscribe({
      next: () => {
        this.refresh()
      }
    })

    this.refresh()

  }

  refresh()
  {
    this.ownedDecorations = [];

    this.apiService.safe.getDecorations().subscribe({
      next: (response) => {
        for (let decoration of response)
        {
          let currentDecorationId = decoration;

          this.apiService.decorations.getInformation(currentDecorationId).subscribe({
            next: (decorationData) => {
              this.ownedDecorations.push({
                id: currentDecorationId,
                ...decorationData
              });
            }
          });
        }
      }
    });
  }

  selectDecoration(decoration: string | null): void {
    if (this.selectedDecoration === decoration)
    {
      this.selectedDecoration = this.currentDecoration;
    } else {
      this.selectedDecoration = decoration;
    }
    
    this.decorationSelected.emit(
      this.selectedDecoration === null?null : 
        this.ownedDecorations.filter((decoration) => decoration.id === this.selectedDecoration)[0]
    );
  }

  getDecorationThumbnail(imageId: string)
  {
    return this.pathResolver.getResourcePath(imageId, FileType.DECORATION_BANNER);
  }

  deleteDecoration(decorationId: string)
  {
    this.dialogs.open(ConfirmDialogComponent, {
      data: {
        title: "Supprimer cette décoration?",
        text: "Les détentaires de cette décoration seront remboursés gracieusement."
      }
    }).afterClosed().subscribe({
      next: (response) => {
        if (response)
        {
          this.apiService.decorations.delete(decorationId).subscribe({
            next: () => {
              this.dialogs.open(AlertDialogComponent, {
                data: {
                  title: "Décoration effacée!",
                  text: "Qu'elle repose en paix dès à présent."
                }
              })

              if (decorationId === this.selectedDecoration)
              {
                this.selectedDecoration = null;
              }

              this.refresh();
              this.decorationDeleted.emit();
            }
          })
        }
      }
    })
  }

}