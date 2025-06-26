import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileAccountSettingsComponent } from './profile-accounts-settings.component';

describe('ProfileAccountsSettingsComponent', () => {
  let component: ProfileAccountSettingsComponent;
  let fixture: ComponentFixture<ProfileAccountSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileAccountSettingsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileAccountSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
