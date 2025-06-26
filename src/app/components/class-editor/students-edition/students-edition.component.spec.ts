import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentsEditionComponent } from './students-edition.component';

describe('StudentsEditionComponent', () => {
  let component: StudentsEditionComponent;
  let fixture: ComponentFixture<StudentsEditionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentsEditionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentsEditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
