import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ApiProfileService } from '../services/api-profile.service';
import { ApiResourcesService } from '../services/api-resources.service';
import { PathResolverService } from '../services/path-resolver.service';
import { FileType } from '../../nooble/api-objs/FileType';
import { File } from '../../nooble/api-objs/File';
import { NgFor } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { PromptDialogComponent } from '../prompt-dialog/prompt-dialog.component';

@Component({
  selector: 'app-profile-image-selector',
  imports: [
    NgFor
  ],
  templateUrl: './profile-image-selector.component.html',
  styleUrl: './profile-image-selector.component.css'
})
export class ProfileImageSelectorComponent implements OnInit {
  images: File[] = [];
  selectedImage: string|null = null;

  @Output() imageSelected = new EventEmitter<string | null>();

  constructor(
    private resourcesService: ApiResourcesService,
    private profileService: ApiProfileService,
    private pathResolver: PathResolverService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.resourcesService.getSelfFiles(FileType.PROFILE_ICON).subscribe({
      next: (response) => {
        this.images = response;
      }
    });

    this.profileService.getInformation().subscribe({
      next: (response) => {
        this.selectedImage = response.profile_image
      }
    })
  }

  getImageUrl(id: string)
  {
    return this.pathResolver.getResourcePath(id, FileType.PROFILE_ICON);
  }

  selectImage(url: string): void {
    this.selectedImage = url;
    this.imageSelected.emit(url);
  }

  addImage(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files[0]) {
      this.dialog.open(PromptDialogComponent, {
        data: { title: 'Comment appelleriez-vous cette image?', placeholder: 'La laque dessine' }
      }).afterClosed().subscribe(chosen_name => {
        if (chosen_name) {
          this.resourcesService.upload(chosen_name, FileType.PROFILE_ICON, input.files![0]).subscribe({
            next: (response) => {
              this.images.push({
                id: response.id,
                size: response.size,
                sent_date: response.sent_date,
                name: chosen_name,
                filename: input.files![0].name,
                filetype: FileType.PROFILE_ICON
              })
            }
          })
        }
      });
    }
  }

  removeImage(id: string): void {
    this.resourcesService.delete(id).subscribe({
      next: () => {
        if (this.selectedImage === id) {
          this.clearSelection();
        }

        this.images = this.images.filter(img => img.id !== id);
      }
    })

  }

  clearSelection(): void {
    this.selectedImage = null;
    this.imageSelected.emit(null);
  }
}
