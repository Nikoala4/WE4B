import { Component, EventEmitter, Inject, Input, OnInit, Output, PLATFORM_ID } from '@angular/core';
import { PathResolverService } from '../../services/path-resolver.service';
import { FileType } from '../../../nooble/api-objs/FileType';
import { File } from '../../../nooble/api-objs/File';
import { isPlatformBrowser, NgFor } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { PromptDialogComponent } from '../prompt-dialog/prompt-dialog.component';
import { ApiService } from '../../services/api.service';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-profile-image-selector',
  imports: [
    NgFor,
    
  ],
  templateUrl: './profile-image-selector.component.html',
  styleUrl: './profile-image-selector.component.css'
})
export class ProfileImageSelectorComponent implements OnInit {
  images: File[] = [];
  @Input() selectedImage: string|null = null;
  @Input() currentImage: string|null = null

  @Output() imageSelected = new EventEmitter<string | null>();

  constructor(
    private apiService: ApiService,
    private pathResolver: PathResolverService,
    private dialog: MatDialog,
    @Inject(PLATFORM_ID) private platformId: string
  ) {}

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    this.apiService.resources.getSelfFiles(FileType.PROFILE_ICON).subscribe({
      next: (response) => {
        this.images = response;
      }
    });
  }

  getImageUrl(id: string)
  {
    return this.pathResolver.getResourcePath(id, FileType.PROFILE_ICON);
  }

  selectImage(id: string): void {
    if (this.selectedImage == id)
    {
      this.selectedImage = this.currentImage;
    } else {
      this.selectedImage = id;
    }
    this.imageSelected.emit(id);
  }

  addImage(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files[0]) {
      let file = input.files[0];
      let reader = new FileReader();

      reader.addEventListener(
        "load", 
        async () => {
          let {
            base64,
            file: fileResult
          }  = await this.squareImage(reader.result as string);

          this.dialog.open(PromptDialogComponent, {
            data: { title: 'Comment appelleriez-vous cette image?', placeholder: 'La laque dessine', providedImageUrl: base64 }
          }).afterClosed().subscribe(chosen_name => {
            if (chosen_name) {
              this.apiService.resources.upload(chosen_name, FileType.PROFILE_ICON, fileResult).subscribe({
                next: (response) => {
                  console.log(response);
                  this.images.push({
                    id: response.new_file,
                    size: response.size,
                    sent_date: response.date,
                    name: chosen_name,
                    filename: file.name,
                    filetype: FileType.PROFILE_ICON
                  })
                }
              })
            }
          });
        },
        false
      );

      reader.readAsDataURL(file)
    }
  }

  removeImage(id: string): void {
    this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: "Êtes vous sûr de supprimer l'image?",
        text: "Cette action est tirée vers cible!"
      }
    }).afterClosed().subscribe({
      next: (value) => {
        if (!value) return;

        this.apiService.resources.delete(id).subscribe({
          next: () => {
            if (this.selectedImage === id) {
              this.clearSelection();
              this.currentImage = null;
            }

            this.images = this.images.filter(img => img.id !== id);
          }
        })
      }

    })
  }

  clearSelection(): void {
    this.selectedImage = null;
    this.imageSelected.emit(null);
  }

  async squareImage(image_base64: string)
  {
    var image = new Image();

    let p = new Promise((resolve, reject) => {
      image.addEventListener("load", () => {
        resolve(undefined);
      });
    })

    image.src = image_base64;

    await p;

    let canvas = document.createElement("canvas");
    canvas.width = 300;
    canvas.height = 300;
    const ctx = canvas.getContext("2d")!;

    let imgwidth = image.width;
    let imgheight = image.height;

    let cnvwidth = canvas.width;
    let cnvheight = canvas.height;

    let kept_height;
    let kept_width;
    let img_startx;
    let img_starty;

    if (imgwidth/imgheight > cnvwidth/cnvheight)
    {
        // image est trop longue, il faut garder la hauteur et couper la largeur
        kept_width = imgheight * cnvwidth / cnvheight;
        kept_height = imgheight;
        img_startx = (imgwidth - kept_width) / 2;
        img_starty = 0;
    } else {
        // image est trop longue, il faut garder la largeur et couper la hauteur
        kept_width = imgwidth;
        kept_height = imgwidth * cnvheight / cnvwidth;
        img_startx = 0;
        img_starty = (imgheight - kept_height) / 2;
    }

    ctx.drawImage(image, img_startx, img_starty, kept_width, kept_height, 0, 0, canvas.width, canvas.height);

    let b64_data_result = canvas.toDataURL();
    var blobBin = atob(b64_data_result.split(',')[1]);
    var array = [];

    for(var i = 0; i < blobBin.length; i++) {
        array.push(blobBin.charCodeAt(i));
    }
    var file=new Blob([new Uint8Array(array)], {type: 'image/png'});

    return {
      file,
      base64: b64_data_result
    }

  }
}
