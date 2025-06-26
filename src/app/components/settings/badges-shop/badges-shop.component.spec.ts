import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BadgesShopComponent } from './badges-shop.component';

describe('BadgesShopComponent', () => {
  let component: BadgesShopComponent;
  let fixture: ComponentFixture<BadgesShopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BadgesShopComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BadgesShopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
