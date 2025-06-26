import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectAmongListComponent } from './select-among-list.component';

describe('SelectAmongListComponent', () => {
  let component: SelectAmongListComponent;
  let fixture: ComponentFixture<SelectAmongListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectAmongListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectAmongListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
