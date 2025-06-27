import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DecorationBuilderComponent } from './decoration-builder.component';

describe('DecorationBuilderComponent', () => {
  let component: DecorationBuilderComponent;
  let fixture: ComponentFixture<DecorationBuilderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DecorationBuilderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DecorationBuilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
