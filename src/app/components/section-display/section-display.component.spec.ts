import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionDisplayComponent } from './section-display.component';

describe('SectionDisplayComponent', () => {
  let component: SectionDisplayComponent;
  let fixture: ComponentFixture<SectionDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SectionDisplayComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SectionDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
