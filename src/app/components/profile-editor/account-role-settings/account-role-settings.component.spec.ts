import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountRoleSettingsComponent } from './account-role-settings.component';

describe('AccountRoleSettingsComponent', () => {
  let component: AccountRoleSettingsComponent;
  let fixture: ComponentFixture<AccountRoleSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccountRoleSettingsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountRoleSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
