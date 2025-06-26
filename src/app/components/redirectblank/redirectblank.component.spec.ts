import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RedirectBlankComponent } from './redirectblank.component';

describe('RedirectblankComponent', () => {
  let component: RedirectBlankComponent;
  let fixture: ComponentFixture<RedirectBlankComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RedirectBlankComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RedirectBlankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
