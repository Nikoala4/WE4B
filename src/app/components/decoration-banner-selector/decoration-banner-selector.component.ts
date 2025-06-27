import { Component, EventEmitter, Inject, Input, OnInit, Output, PLATFORM_ID } from '@angular/core';
import { PathResolverService } from '../../services/path-resolver.service';
import { FileType } from '../../../nooble/api-objs/FileType';
import { File } from '../../../nooble/api-objs/File';
import { isPlatformBrowser, NgFor } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { PromptDialogComponent } from '../prompt-dialog/prompt-dialog.component';
import { ApiService } from '../../services/api.service';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { AlertDialogComponent } from '../alert-dialog/alert-dialog.component';

@Component({
  selector: 'app-decoration-banner-selector',
  imports: [
    NgFor,
    
  ],
  templateUrl: './decoration-banner-selector.component.html',
  styleUrl: './decoration-banner-selector.component.css'
})
export class DecorationBannerSelectorComponent implements OnInit {
  images: File[] = [];
  @Input() selectedImage: string = '';
  @Input() currentImage: string = ''
  @Input() selectCurrentImage: boolean = true;

  @Input() bannerFilesModified = new EventEmitter<null>()

  @Output() imageSelected = new EventEmitter<string>();

  constructor(
    private apiService: ApiService,
    private pathResolver: PathResolverService,
    private dialog: MatDialog,
    @Inject(PLATFORM_ID) private platformId: string
  ) {}

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    this.bannerFilesModified.subscribe({
      next: () => {
        this.refresh()
      }
    })

    this.refresh();

  }

  refresh()
  {
    this.apiService.resources.getSelfFiles(FileType.DECORATION_BANNER).subscribe({
      next: (response) => {
        this.images = response;

        if (this.selectedImage === '') 
          {
            this.selectImage(this.images[0].id);
          }
      }
    });
  }

  getImageUrl(id: string)
  {
    return this.pathResolver.getResourcePath(id, FileType.DECORATION_BANNER);
  }

  selectImage(id: string): void {
    this.selectedImage = id;
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
          }  = await this.adjustImageDimensions(reader.result as string);

          this.dialog.open(PromptDialogComponent, {
            data: { title: 'Comment appelleriez-vous cette image?', placeholder: 'La laque dessine', providedImageUrl: base64 }
          }).afterClosed().subscribe(chosen_name => {
            if (chosen_name) {
              this.apiService.resources.upload(chosen_name, FileType.DECORATION_BANNER, fileResult).subscribe({
                next: (response) => {
                  this.images.push({
                    id: response.new_file,
                    size: response.size,
                    sent_date: response.date,
                    name: chosen_name,
                    filename: file.name,
                    filetype: FileType.DECORATION_BANNER
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
              this.selectedImage = this.images[0].id
              this.imageSelected.emit(this.selectedImage)
            }

            this.images = this.images.filter(img => img.id !== id);
          },
        error: () => {
          this.dialog.open(AlertDialogComponent, {
            data: {
              title: "Impossible de supprimer cette bannière de décoration",
              text: "Veuillez vous assurer qu'il n'y a pas de décoration associée à cette banière dans un premier temps. "
            }
          })
        }
        })
      }

    })
  }

  async adjustImageDimensions(image_base64: string)
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
    canvas.width = 900;
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
