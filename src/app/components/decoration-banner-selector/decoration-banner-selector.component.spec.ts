import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DecorationBannerSelectorComponent } from './decoration-banner-selector.component';

describe('DecorationBannerSelectionComponent', () => {
  let component: DecorationBannerSelectorComponent;
  let fixture: ComponentFixture<DecorationBannerSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DecorationBannerSelectorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DecorationBannerSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
