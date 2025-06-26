import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DecorationShopComponent } from './decoration-shop.component';

describe('DecorationShopComponent', () => {
  let component: DecorationShopComponent;
  let fixture: ComponentFixture<DecorationShopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DecorationShopComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DecorationShopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
