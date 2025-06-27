import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyDecorationDialogComponent } from './buy-decoration-dialog.component';

describe('BuyDecorationDialogComponent', () => {
  let component: BuyDecorationDialogComponent;
  let fixture: ComponentFixture<BuyDecorationDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuyDecorationDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuyDecorationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
