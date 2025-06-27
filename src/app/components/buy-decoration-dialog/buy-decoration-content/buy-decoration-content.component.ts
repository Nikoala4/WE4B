import { Component, Input } from '@angular/core';
import { Decoration } from '../../../../nooble/api-objs/Decoration';
import { ApiGetDecorationInformationResponse } from '../../../../nooble/api-comm/GetDecorationInfoResponse';
import { PathResolverService } from '../../../services/path-resolver.service';
import { FileType } from '../../../../nooble/api-objs/FileType';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-buy-decoration-content',
  imports: [
    CommonModule
  ],
  templateUrl: './buy-decoration-content.component.html',
  styleUrl: './buy-decoration-content.component.css'
})
export class BuyDecorationContentComponent {

  @Input() quota: number = -1;

  @Input() details: ApiGetDecorationInformationResponse | null = null;

  constructor(
    private pathResolver: PathResolverService,
  ) {}

  getDecorationThumbnail()
  {
    if (this.details) return this.pathResolver.getResourcePath(this.details.image, FileType.DECORATION_BANNER);
    else return "";
  }

  isPurchasable(): boolean
  {
    return this.details !== null && this.quota > this.details.price    
  }

}
