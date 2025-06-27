import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountClassesSelectionComponent } from './account-classes-selection.component';

describe('AccountClassesSelectionComponent', () => {
  let component: AccountClassesSelectionComponent;
  let fixture: ComponentFixture<AccountClassesSelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccountClassesSelectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountClassesSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
