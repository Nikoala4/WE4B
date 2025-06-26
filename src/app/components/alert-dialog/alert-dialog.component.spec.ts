import { TestBed } from '@angular/core/testing';
import { AlertDialogComponent } from './alert-dialog.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

describe('PromptDialogComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlertDialogComponent],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: { title: 'Test', placeholder: '...' } },
        { provide: MatDialogRef, useValue: { close: () => {} } }
      ]
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(AlertDialogComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });
});
