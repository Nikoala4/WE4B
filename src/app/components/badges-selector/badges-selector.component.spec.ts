import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BadgesSelectorComponent } from './badges-selector.component';

describe('BadgesSelectorComponent', () => {
  let component: BadgesSelectorComponent;
  let fixture: ComponentFixture<BadgesSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BadgesSelectorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BadgesSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
