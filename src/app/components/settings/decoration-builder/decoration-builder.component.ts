import { ChangeDetectorRef, Component, EventEmitter } from '@angular/core';
import { DecorationSelectorComponent } from "../../decoration-selector/decoration-selector.component";
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Decoration } from '../../../../nooble/api-objs/Decoration';
import { ApiService } from '../../../services/api.service';
import { DecorationBannerSelectorComponent } from "../../decoration-banner-selector/decoration-banner-selector.component";
import { Observable } from 'rxjs';
import { ApiCreateDecorationResponse } from '../../../../nooble/api-comm/CreateDecorationResponse';
import { MatDialog } from '@angular/material/dialog';
import { AlertDialogComponent } from '../../alert-dialog/alert-dialog.component';

@Component({
  selector: 'app-decoration-builder',
  imports: [
    DecorationSelectorComponent,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    DecorationBannerSelectorComponent
],
  templateUrl: './decoration-builder.component.html',
  styleUrl: './decoration-builder.component.css'
})
export class DecorationBuilderComponent {

  decorationBannerImage: string = ''

  overwrittenDecoration: string | null = null

  form: FormGroup;

  decorationEvent: EventEmitter<null> = new EventEmitter<null>()
  bannerImageEvent: EventEmitter<null> = new EventEmitter<null>()

  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private dialogs: MatDialog
  )
  {
    this.form = this.fb.group({
      name: [
        '',
        [
          Validators.required
        ]
      ],
      file: [
        null,
        [],[
          async (control: AbstractControl) => await this.ensureImageDimensions(control)
        ]
      ],
      price: [
        0,
        [
          Validators.min(0),
          Validators.required
        ]
      ]
    })
  }

  async ensureImageDimensions(
    control: AbstractControl
  )
  {
    if (this.decorationBannerImage === null) {
      if (this.overwrittenDecoration === null)
      {
        return {
          required: true
        }
      }

      return null
    } else {
      return null
    }

  }

  onImageSelected(image: string)
  {
    this.decorationBannerImage = image;

    const fileControl = this.form.get('file')!;
    fileControl.setValue(image);
    fileControl.markAsTouched();
    fileControl.updateValueAndValidity({ onlySelf: true });
  }

  onDecorationSelected(
    decoration: Decoration | null
  )
  {
    if (decoration !== null) 
    {
      this.overwrittenDecoration = decoration.id;
      this.form.get('name')!.setValue(decoration.name);
      this.decorationBannerImage = decoration.image;
      this.form.get('price')!.setValue(decoration.price);

    }

    const fileControl = this.form.get('file')!;
    fileControl.setValue(this.decorationBannerImage);
    fileControl.markAsTouched();
    fileControl.updateValueAndValidity({ onlySelf: true });
  }

  saveBanner()
  {
    let request: Observable<ApiCreateDecorationResponse | null>;

    if (this.overwrittenDecoration === null)
    {
      request = this.api.decorations.create(
        this.form.get('name')!.value,
        this.form.get('price')!.value,
        this.decorationBannerImage
      );
    } else {
      request = this.api.decorations.modify(
        this.overwrittenDecoration,
        this.form.get('name')!.value,
        this.form.get('price')!.value,
        this.decorationBannerImage
      )
    }

    request.subscribe({
      next: () => {
        this.dialogs.open(AlertDialogComponent, {
          data: {
            title: "Décoration sauvegardée!",
            text: "Encore faut-il espérée qu'elle soit utilisée. "
          }
        })

        this.decorationEvent.emit();
      }
    })
  }

}
