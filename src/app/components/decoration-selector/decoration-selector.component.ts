import { Component, EventEmitter, Inject, Input, Output, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Decoration } from '../../../nooble/api-objs/Decoration';
import { ApiGetDecorationInformationResponse } from '../../../nooble/api-comm/GetDecorationInfoResponse';
import { ApiService } from '../../services/api.service';
import { PathResolverService } from '../../services/path-resolver.service';
import { FileType } from '../../../nooble/api-objs/FileType';

@Component({
  selector: 'app-decoration-selector',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './decoration-selector.component.html',
  styleUrls: ['./decoration-selector.component.css']
})
export class DecorationSelectorComponent {
  ownedDecorations: Decoration[] = [];

  @Input() currentDecoration: string|null = null;
  @Input() selectedDecoration: string | null = null;
  @Output() decorationSelected = new EventEmitter<string | null>();

  constructor(
    private apiService: ApiService,
    private pathResolver: PathResolverService,
    @Inject(PLATFORM_ID) private platformId: string
  ) {}

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    this.apiService.safe.getDecorations().subscribe({
      next: (response) => {
        this.selectedDecoration = this.currentDecoration;

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
    
    this.decorationSelected.emit(decoration);
  }

  getDecorationThumbnail(imageId: string)
  {
    return this.pathResolver.getResourcePath(imageId, FileType.DECORATION_BANNER);
  }

}