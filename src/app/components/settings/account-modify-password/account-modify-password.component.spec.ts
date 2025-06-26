import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountModifyPasswordComponent } from './account-modify-password.component';

describe('AccountModifyPasswordComponent', () => {
  let component: AccountModifyPasswordComponent;
  let fixture: ComponentFixture<AccountModifyPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccountModifyPasswordComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountModifyPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
