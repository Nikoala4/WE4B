import { TestBed } from '@angular/core/testing';
import { BuyBadgeDialogComponent } from './buy-badge-dialog.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

describe('BuyBadgeDialogComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuyBadgeDialogComponent],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: { title: 'Test', placeholder: '...' } },
        { provide: MatDialogRef, useValue: { close: () => {} } }
      ]
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(BuyBadgeDialogComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });
});
