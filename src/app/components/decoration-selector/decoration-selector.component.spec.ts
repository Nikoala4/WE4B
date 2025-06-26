import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DecorationSelectorComponent } from './decoration-selector.component';

describe('DecorationSelectorComponent', () => {
  let component: DecorationSelectorComponent;
  let fixture: ComponentFixture<DecorationSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DecorationSelectorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DecorationSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
