import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentOrTeacherHomeComponent } from './student-or-teacher-home.component';

describe('TeacherHomeComponent', () => {
  let component: StudentOrTeacherHomeComponent;
  let fixture: ComponentFixture<StudentOrTeacherHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentOrTeacherHomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentOrTeacherHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
