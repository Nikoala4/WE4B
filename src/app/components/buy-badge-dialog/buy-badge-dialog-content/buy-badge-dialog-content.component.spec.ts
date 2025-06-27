import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyBadgeDialogContentComponent } from './buy-badge-dialog-content.component';

describe('BuyBadgeDialogContentComponent', () => {
  let component: BuyBadgeDialogContentComponent;
  let fixture: ComponentFixture<BuyBadgeDialogContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuyBadgeDialogContentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuyBadgeDialogContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
