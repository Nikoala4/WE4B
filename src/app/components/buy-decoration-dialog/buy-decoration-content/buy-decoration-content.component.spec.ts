import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyDecorationContentComponent } from './buy-decoration-content.component';

describe('BuyDecorationContentComponent', () => {
  let component: BuyDecorationContentComponent;
  let fixture: ComponentFixture<BuyDecorationContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuyDecorationContentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuyDecorationContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
