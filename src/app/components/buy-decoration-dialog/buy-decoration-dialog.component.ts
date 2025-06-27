import { Component, Inject, Input, PLATFORM_ID } from '@angular/core';
import { ApiGetDecorationInformationResponse } from '../../../nooble/api-comm/GetDecorationInfoResponse';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { BuyDecorationContentComponent } from "./buy-decoration-content/buy-decoration-content.component";
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { ApiService } from '../../services/api.service';
import { AlertDialogComponent } from '../alert-dialog/alert-dialog.component';

@Component({
  selector: 'app-buy-decoration-dialog',
  imports: [
    MatDialogModule,
    CommonModule,
    BuyDecorationContentComponent
],
  templateUrl: './buy-decoration-dialog.component.html',
  styleUrl: './buy-decoration-dialog.component.css'
})
export class BuyDecorationDialogComponent {
  constructor(
    @Inject(PLATFORM_ID) private platformId: string,
    public dialogRef: MatDialogRef<BuyDecorationDialogComponent>,
    private dialogs: MatDialog,
    private apiService: ApiService,
    @Inject(MAT_DIALOG_DATA) public data: {
      decoration: string
    }
  ) {}

  quota: number = -1;
  details: ApiGetDecorationInformationResponse | null = null;

  ngOnInit()
  {
    if (!isPlatformBrowser(this.platformId)) return;

    this.apiService.safe.getQuota().subscribe({
      next: (response) => {
        this.quota = response
      }
    });

    this.apiService.decorations.getInformation(this.data.decoration).subscribe({
      next: (response) => {
        this.details = response;
      }
    })
  }

  isPurchasable(): boolean
  {
    return this.details !== null && this.quota > this.details.price    
  }

  onBuyLaunched()
  {
    this.apiService.decorations.buy(this.data.decoration).subscribe({
      next: () => {
        this.dialogRef.close(true);
        this.dialogs.open(AlertDialogComponent, {
          data: {
            title: "Décoration achetée!",
            text: "On ne vous regardera plus de même œil"
          }
        })
      },
      error: () => {
        this.dialogRef.close(false);
        this.dialogs.open(AlertDialogComponent, {
          data: {
            title: "Cette décoration n'a pas pu être acheté",
            text: "C'est ainsi, il faut s'y faire. "
          }
        })
      }
    });
  }
}
